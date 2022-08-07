import { Form, Formik } from "formik";
import { authActions, selectIsLogging } from "features/auth/authSlice";
import { initialValues, validationSchema } from "formik/signIn";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { Field } from "components/Custom/InputField";
import { useNavigate } from "react-router-dom";

export default function SigninForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogging = useSelector(selectIsLogging);

  const handleSubmit = (values) => {
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
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {(formikProps) => {
        const { values, touched, errors, handleChange } = formikProps;
        return (
          <Form>
            <Field
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
              autoFocus={true}
              autoComplete="email"
            />

            <Field
              name="password"
              label="Password"
              type="password"
              value={values.password}
              onChange={handleChange}
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
