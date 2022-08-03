import { Field } from "components/FormField/InputField";
import React from "react";
import { useSelector } from "react-redux";

export const InputField = ({ values, touched, errors, handleChange }) => {
  const languages = useSelector((state) => state.app.language);

  return (
    <>
      <Field
        name="firstName"
        label={languages === "VN" ? "Tên họ" : "First name"}
        type="text"
        value={values ? values.firstName : ""}
        onChange={handleChange}
        error={
          errors && touched
            ? touched.firstName && Boolean(errors.firstName)
            : null
        }
      />

      <Field
        name="lastName"
        label={languages === "VN" ? "Tên cuối" : "Last name"}
        type="text"
        value={values ? values.lastName : ""}
        onChange={handleChange}
        error={
          errors && touched
            ? touched.lastName && Boolean(errors.lastName)
            : null
        }
      />

      <Field
        name="email"
        label="email"
        type="text"
        value={values ? values.email : ""}
        onChange={handleChange}
        error={
          errors && touched ? touched.email && Boolean(errors.email) : null
        }
      />

      <Field
        name="age"
        label={languages === "VN" ? "Tuổi" : "Age"}
        type="text"
        value={values ? values.age : ""}
        onChange={handleChange}
        error={errors && touched ? touched.age && Boolean(errors.age) : null}
      />

      <Field
        name="team"
        label={languages === "VN" ? "Nhóm" : "Team"}
        type="text"
        value={values ? values.team : ""}
        onChange={handleChange}
        error={errors && touched ? touched.team && Boolean(errors.team) : null}
      />

      <Field
        name="role"
        label={languages === "VN" ? "Chức vụ" : "Role"}
        type="text"
        value={values ? values.role : ""}
        onChange={handleChange}
        error={errors && touched ? touched.role && Boolean(errors.role) : null}
      />
    </>
  );
};
