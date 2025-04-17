import Swal from "sweetalert2";

export const showAlert = (title, text, icon = "info") => {
  return Swal.fire({
    title,
    text,
    icon,
    timer: 2000,
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const formatDate = (dateTime) => {
  const date = new Date(dateTime).toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return date
}