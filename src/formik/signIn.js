import * as Yup from "yup";

export const initialValues = {
  email: "",
  password: "",
};

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email !!")
    .required("Please enter your email 🤔"),

  password: Yup.string()
    .min(8, "Password too short!")
    .required("Please Enter your password"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
  //   "Must Contain One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
});
