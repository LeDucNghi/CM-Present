import { ErrorMessage } from "formik";
import React from "react";

export const TextField = ({ values, touched, errors, handleChange }) => {
  return (
    <>
      <TextField
        fullWidth
        name="firstName"
        label="firstName"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.firstName : ""}
        onChange={handleChange}
        error={errors ? touched.firstName && Boolean(errors.firstName) : null}
      />

      <ErrorMessage name="firstName" />

      <TextField
        fullWidth
        name="lastName"
        label="lastName"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.lastName : ""}
        onChange={handleChange}
        error={errors ? Boolean(errors.lastName) : null}
      />

      <ErrorMessage name="lastName" />

      <TextField
        fullWidth
        name="email"
        label="email"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.email : ""}
        onChange={handleChange}
        error={errors ? touched.email && Boolean(errors.email) : null}
      />

      <ErrorMessage name="email" />

      <TextField
        fullWidth
        margin="normal"
        name="age"
        label="age"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.age : ""}
        onChange={handleChange}
        error={errors ? touched.age && Boolean(errors.age) : null}
      />
      <ErrorMessage name="age" />

      <TextField
        fullWidth
        margin="normal"
        name="team"
        label="team"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.team : ""}
        onChange={handleChange}
        error={errors ? touched.team && Boolean(errors.team) : null}
      />
      <ErrorMessage name="team" />

      <TextField
        fullWidth
        margin="normal"
        name="role"
        label="role"
        type="text"
        id="outlined-error-helper-text"
        value={values ? values.role : ""}
        onChange={handleChange}
        error={errors ? touched.role && Boolean(errors.role) : null}
      />

      <ErrorMessage name="role" />
    </>
  );
};
