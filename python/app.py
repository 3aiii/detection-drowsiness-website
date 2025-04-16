from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from ultralytics import YOLO
import mediapipe as mp
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='*', supports_credentials=True)

detectyawn = YOLO("runs/detectyawn/train/weights/best.pt")
detecteye = YOLO("runs/detecteye/train/weights/best.pt")
face_mesh = mp.solutions.face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)
points_ids = [187, 411, 152, 68, 174, 399, 298]

# Global state variables
blinks = 0
microsleeps = 0.0
yawns = 0
yawn_duration = 0.0
left_eye_still_closed = False
right_eye_still_closed = False
yawn_in_progress = False

@app.route('/predict', methods=['POST'])
def predict():
    global blinks, microsleeps, yawns, yawn_duration
    global left_eye_still_closed, right_eye_still_closed, yawn_in_progress

    data = request.json
    if 'image' not in data:
        return jsonify({'error': 'No image provided'}), 400

    image_data = data['image']
    image_bytes = base64.b64decode(image_data.split(',')[1])
    np_arr = np.frombuffer(image_bytes, np.uint8)
    frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = face_mesh.process(image_rgb)

    yawn_state = 'Unknown'
    left_eye_state = 'Unknown'
    right_eye_state = 'Unknown'
    alert_text = ""

    if results.multi_face_landmarks:
        for face_landmarks in results.multi_face_landmarks:
            ih, iw, _ = frame.shape
            points = []
            for point_id in points_ids:
                lm = face_landmarks.landmark[point_id]
                x, y = int(lm.x * iw), int(lm.y * ih)
                points.append((x, y))

            if len(points) != 0:
                x1, y1 = points[0]
                x2, _ = points[1]
                _, y3 = points[2]
                x4, y4 = points[3]
                x5, y5 = points[4]
                x6, y6 = points[5]
                x7, y7 = points[6]

                x6, x7 = min(x6, x7), max(x6, x7)
                y6, y7 = min(y6, y7), max(y6, y7)

                mouth_roi = frame[y1:y3, x1:x2]
                right_eye_roi = frame[y4:y5, x4:x5]
                left_eye_roi = frame[y6:y7, x6:x7]

                def predict_eye(eye_frame):
                    results_eye = detecteye.predict(eye_frame)
                    boxes = results_eye[0].boxes
                    if len(boxes) == 0:
                        return "Unknown"
                    confidences = boxes.conf.cpu().numpy()
                    class_ids = boxes.cls.cpu().numpy()
                    class_id = int(class_ids[np.argmax(confidences)])
                    return "Close Eye" if class_id == 1 else "Open Eye"

                def predict_yawn(yawn_frame):
                    results_yawn = detectyawn.predict(yawn_frame)
                    boxes = results_yawn[0].boxes
                    if len(boxes) == 0:
                        return "Unknown"
                    confidences = boxes.conf.cpu().numpy()
                    class_ids = boxes.cls.cpu().numpy()
                    class_id = int(class_ids[np.argmax(confidences)])
                    return "Yawn" if class_id == 0 else "No Yawn"

                left_eye_state = predict_eye(left_eye_roi)
                right_eye_state = predict_eye(right_eye_roi)
                yawn_state = predict_yawn(mouth_roi)

                # Logic for blink and microsleep detection
                if left_eye_state == "Close Eye" and right_eye_state == "Close Eye":
                    if not left_eye_still_closed and not right_eye_still_closed:
                        left_eye_still_closed = right_eye_still_closed = True
                        blinks += 1
                    microsleeps += 45 / 1000
                else:
                    if left_eye_still_closed and right_eye_still_closed:
                        left_eye_still_closed = right_eye_still_closed = False
                    microsleeps = 0

                # Yawn logic
                if yawn_state == "Yawn":
                    if not yawn_in_progress:
                        yawn_in_progress = True
                        yawns += 1
                    yawn_duration += 45 / 1000
                else:
                    if yawn_in_progress:
                        yawn_in_progress = False
                        yawn_duration = 0

                # Alert logic
                if yawn_duration > 0.5:
                    alert_text = "⚠️ Alert: Prolonged Yawn Detected!"
                elif microsleeps > 4.0:
                    alert_text = "⚠️ Alert: Prolonged Microsleep Detected!"
    return jsonify({
        "face_detected": bool(results.multi_face_landmarks),
        "left_eye": left_eye_state,
        "right_eye": right_eye_state,
        "yawn": yawn_state,
        "blinks": blinks,
        "microsleeps": round(microsleeps, 2),
        "yawns": yawns,
        "yawn_duration": round(yawn_duration, 2),
        "alert_text": alert_text
    })

@app.route('/reset', methods=['POST'])
def reset_state():
    global blinks, microsleeps, yawns, yawn_duration
    global left_eye_still_closed, right_eye_still_closed, yawn_in_progress

    blinks = 0
    microsleeps = 0.0
    yawns = 0
    yawn_duration = 0.0
    left_eye_still_closed = False
    right_eye_still_closed = False
    yawn_in_progress = False

    return jsonify({"`message`": "State reset successful"})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)