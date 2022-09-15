import Swal from "sweetalert2";

export const checkDiffElement = (row, selectedRow) => {
  return row.filter((x) => !selectedRow.some((x1) => x.id === x1.id));
};

export const checkSameElement = (row, selectedRow) => {
  return row.filter((x) => selectedRow.some((x1) => x.id === x1.id));
};

export const getArrayElement = (arr) => {
  console.log("🚀 ~ file: common.js ~ line 12 ~ getArrayElement ~ arr", arr);
  var newEl;
  if (Array.isArray(arr) && arr.length > 0) {
    arr.forEach((el) => {
      const { id, ...rest } = el;
      console.log(
        "🚀 ~ file: common.js ~ line 17 ~ arr.forEach ~ id, ...rest",
        id,
        { ...rest }
      );
      return (newEl = {
        id: id,
        values: { ...rest },
      });
    });
    return newEl;
  }
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
