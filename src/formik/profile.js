import { store } from "store";
import * as Yup from "yup";

const userInfo = store.getState().app.userInfo;
console.log("🚀 ~ file: profile.js ~ line 5 ~ userInfo", userInfo);

export const initialValues = {
  firstName: `${userInfo ? userInfo.firstName : ""}`,
  lastName: `${userInfo ? userInfo.lastName : ""}`,
  email: `${userInfo ? userInfo.email : ""}`,
  age: `${userInfo ? userInfo.age : ""}`,
};

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(1, "Please enter your real name 😒")
    .required("Please enter your first name 🤔"),

  lastName: Yup.string()
    .min(1, "Please type your real name 😒")
    .required("Please enter your last name 🤔"),

  email: Yup.string()
    .email("Invalid email !!")
    .required("Please enter your email 🤔"),

  age: Yup.string().required("Please enter your age 🤔"),
});
