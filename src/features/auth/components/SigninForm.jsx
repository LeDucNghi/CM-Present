import { ErrorMessage, Form, Formik } from "formik";
import { authActions, selectIsLogging } from "features/auth/authSlice";
import { initialValues, validationSchema } from "formik/signIn";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Field } from "components/Custom/InputField";
import React from "react";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

export default function SigninForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogging = useSelector(selectIsLogging);

  const handleSubmit = (values, { setSubmitting }) => {
    const value = {
      values,
      navigate,
    };
    dispatch(authActions.login(value));
  };
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values, { setSubmitting });
      }}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange } = formikProps;
        return (
          <Form>
            <Field
              // margin="normal"
              // required
              // fullWidth
              // id="email"
              // label="Email Address"
              // name="email"
              // autoComplete="email"
              // autoFocus
              // value={values.email}
              // onChange={handleChange}
              // error={touched.email && Boolean(errors.email)}
              // helperText={errors.email && touched.email}

              name="email"
              label="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              error={
                errors && touched
                  ? touched.email && Boolean(errors.email)
                  : null
              }
            />
            {/* <ErrorMessage name="email">
              {(msg) => (
                <p style={{ color: "red", fontSize: "12px" }}>{msg} </p>
              )}
            </ErrorMessage> */}

            <Field
              // margin="normal"
              // required
              // fullWidth
              // name="password"
              // label="Password"
              // type="password"
              // id="password"
              // autoComplete="current-password"
              // value={values.password}
              // onChange={handleChange}
              // error={touched.password && Boolean(errors.password)}
              // helperText={errors.password && touched.password}

              name="password"
              label="Password"
              type="text"
              value={values.password}
              onChange={handleChange}
              error={
                errors && touched
                  ? touched.password && Boolean(errors.password)
                  : null
              }
            />
            {/* <ErrorMessage name="password">
              {(msg) => (
                <p style={{ color: "red", fontSize: "12px" }}>{msg} </p>
              )}
            </ErrorMessage> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {/* Sign In */}
              {isLogging ? (
                <CircularProgress size={20} color="secondary" />
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}
