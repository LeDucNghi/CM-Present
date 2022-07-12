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
        value={values.firstName}
        onChange={handleChange}
        error={touched.firstName && Boolean(errors.firstName)}
      />

      <ErrorMessage name="firstName" />

      <TextField
        fullWidth
        name="lastName"
        label="lastName"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values.lastName}
        onChange={handleChange}
        error={touched.lastName && Boolean(errors.lastName)}
      />

      <ErrorMessage name="lastName" />

      <TextField
        fullWidth
        name="email"
        label="email"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
      />

      <ErrorMessage name="email" />

      <TextField
        fullWidth
        margin="normal"
        name="age"
        label="age"
        type="text"
        id="outlined-error-helper-text"
        value={values.age}
        onChange={handleChange}
        error={touched.age && Boolean(errors.age)}
      />
      <ErrorMessage name="age" />

      <TextField
        fullWidth
        margin="normal"
        name="team"
        label="team"
        type="text"
        id="outlined-error-helper-text"
        value={values.team}
        onChange={handleChange}
        error={touched.team && Boolean(errors.team)}
      />
      <ErrorMessage name="team" />

      <TextField
        fullWidth
        margin="normal"
        name="role"
        label="role"
        type="text"
        id="outlined-error-helper-text"
        value={values.role}
        onChange={handleChange}
        error={touched.role && Boolean(errors.role)}
      />

      <ErrorMessage name="role" />
    </>
  );
};
