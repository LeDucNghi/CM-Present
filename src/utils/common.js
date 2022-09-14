import Swal from "sweetalert2";

export const checkDiffElement = (row, selectedRow) => {
  return row.filter((x) => !selectedRow.some((x1) => x.id === x1.id));
};

export const checkSameElement = (row, selectedRow) => {
  return row.filter((x) => selectedRow.some((x1) => x.id === x1.id));
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
