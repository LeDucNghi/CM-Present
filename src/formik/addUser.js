import * as Yup from "yup";

export const initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  role: "",
  team: "",
  project: "",
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

  role: Yup.string().required("Please enter your age 🤔"),

  team: Yup.string().required("Please enter your age 🤔"),

  project: Yup.string().required("Please enter your age 🤔"),
});
