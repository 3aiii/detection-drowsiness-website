const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (req.params.id) {
      cb(null, "src/images/profiles");
    } else {
      cb(new Error("Invalid URL parameter. Upload path not found."), null);
    }
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/; ``
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error("Only .jpeg, .jpg, .png files are allowed!"));
  }
};

const uploadProfile = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter,
}).single("upload");

module.exports = uploadProfile;