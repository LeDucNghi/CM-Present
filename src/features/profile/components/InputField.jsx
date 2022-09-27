import { Field } from "components/Custom/InputField";
import React from "react";
import { selectLanguage } from "features/drawer/drawerSlice";
import { selectUserProfile } from "../profileSlice";
import { useSelector } from "react-redux";

export const InputField = ({
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
}) => {
  const languages = useSelector(selectLanguage);
  const account = JSON.parse(localStorage.getItem("account"));

  return (
    <>
      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="firstName"
        label={languages === "VN" ? "Tên họ" : "First name"}
        type="text"
        value={values ? values.firstName : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          errors && touched
            ? touched.firstName && Boolean(errors.firstName)
            : null
        }
      />

      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="lastName"
        label={languages === "VN" ? "Tên cuối" : "Last name"}
        type="text"
        value={values ? values.lastName : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          errors && touched
            ? touched.lastName && Boolean(errors.lastName)
            : null
        }
      />

      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="email"
        label="email"
        type="text"
        value={values ? values.email : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          errors && touched ? touched.email && Boolean(errors.email) : null
        }
      />

      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="age"
        label={languages === "VN" ? "Tuổi" : "Age"}
        type="text"
        value={values ? values.age : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors && touched ? touched.age && Boolean(errors.age) : null}
      />

      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="team"
        label={languages === "VN" ? "Nhóm" : "Team"}
        type="text"
        value={values ? values.team : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors && touched ? touched.team && Boolean(errors.team) : null}
      />

      <Field
        disabled={account.values.role === "admin" ? false : true}
        name="role"
        label={languages === "VN" ? "Chức vụ" : "Role"}
        type="text"
        value={values ? values.role : ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors && touched ? touched.role && Boolean(errors.role) : null}
      />
    </>
  );
};
