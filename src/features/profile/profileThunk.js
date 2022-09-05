import { setImage } from "./profileSlice";

export const onImageChange = (e) => (dispatch, getState) => {
  if (e.target.files && e.target.files[0]) {
    // const img = URL.createObjectURL(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      //   image = reader.result;
      //   setImage(image);
      //   setFieldValue("image", image);
      dispatch(setImage(reader.result));
    };
  }
};
