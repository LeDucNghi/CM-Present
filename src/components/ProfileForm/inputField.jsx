import { Field } from "components/Field/field";
import React from "react";

export const InputField = ({ values, touched, errors, handleChange }) => {
  return (
    <>
      <Field
        name="firstName"
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
        type="text"
        value={values ? values.email : ""}
        onChange={handleChange}
        error={
          errors && touched ? touched.email && Boolean(errors.email) : null
        }
      />

      <Field
        name="age"
        type="text"
        value={values ? values.age : ""}
        onChange={handleChange}
        error={errors && touched ? touched.age && Boolean(errors.age) : null}
      />

      <Field
        name="team"
        type="text"
        value={values ? values.team : ""}
        onChange={handleChange}
        error={errors && touched ? touched.team && Boolean(errors.team) : null}
      />

      <Field
        name="role"
        type="text"
        value={values ? values.role : ""}
        onChange={handleChange}
        error={errors && touched ? touched.role && Boolean(errors.role) : null}
      />
    </>
  );
};
