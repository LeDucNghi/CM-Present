import Swal from "sweetalert2";
import { store } from "app/store";

export const checkDiffElement = (row, selectedRow) => {
  return row.filter((x) => !selectedRow.some((x1) => x.id === x1.id));
};

export const checkSameElement = (row, selectedRow) => {
  return row.filter((x) => selectedRow.some((x1) => x.id === x1.id));
};

export const getArrayElement = (arr) => {
  var newEl;
  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach((el) => {
      newEl = el;
    });
    return newEl;
  }
};

export const successPopup = (VN, Eng, isDenied) => {
  const languages = store.getState().drawer.language;
  const mode = store.getState().drawer.mode;
  var newPopup;

  newPopup = Swal.fire({
    icon: "success",
    title: languages === "VN" ? `${VN}` : `${Eng}`,

    background: mode === "dark" ? "#19191a" : "",
    color: mode === "dark" ? "#e1e1e1" : "",

    text: isDenied
      ? `${
          languages === `VN`
            ? `Bạn có thể khôi phục ở thùng rác!`
            : `You can restore in trash`
        }`
      : ``,
  });

  return newPopup;
};

export const failedPopup = (message) => {
  const mode = store.getState().drawer.mode;

  return Swal.fire({
    icon: "error",
    title: `${message}`,
    background: mode === "dark" ? "#19191a" : "",
    color: mode === "dark" ? "#e1e1e1" : "",
  });
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
