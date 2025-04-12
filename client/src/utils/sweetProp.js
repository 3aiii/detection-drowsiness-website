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
