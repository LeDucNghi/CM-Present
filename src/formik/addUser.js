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

export const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(1, "Please enter your real name 😒")
    .required("Please enter your first name 🤔"),

  lastName: Yup.string()
    .min(1, "Please type your real name 😒")
    .required("Please enter your last name 🤔"),

  email: Yup.string()
    .email("Invalid email !!")
    .required("Please enter your email 🤔"),

  age: Yup.number()
    .positive("Please enter a positive number.")
    .min(18, "Min is 18")
    .max(60, "Max is 60")
    .integer("Please enter an integer.")
    .required("Please enter age.")
    .typeError("Please enter a valid number."),

  role: Yup.string()
    .min(1, "Invalid role!")
    .required("Please enter your role 🤔"),

  team: Yup.string()
    .min(1, "Invalid team!")
    .required("Please enter your team 🤔"),

  project: Yup.string()
    .min(1, "Invalid project!")
    .required("Please enter your project 🤔"),
});
