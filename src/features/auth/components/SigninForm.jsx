import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/signIn";
import { login, selectIsLogging } from "features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Field } from "components/Custom/InputField";

export default function SigninForm() {
  const dispatch = useDispatch();
  const isLogging = useSelector(selectIsLogging);

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values) => {
        // dispatch(handleLogin(values));
        dispatch(login(values));
      }}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange, handleBlur } =
          formikProps;
        return (
          <Form>
            <Field
              name="email"
              label="Email"
              type="text"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors && touched
                  ? touched.email && Boolean(errors.email)
                  : null
              }
              autoFocus={true}
              autoComplete="email"
            />

            <Field
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors && touched
                  ? touched.password && Boolean(errors.password)
                  : null
              }
              autoFocus={true}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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
