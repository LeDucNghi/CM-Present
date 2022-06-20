import { ErrorMessage, Form, Formik } from "formik";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { initialValues, validationSchema } from "formik/signIn";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting }) => {
    const email = "testing@gmail.com";
    const password = "123456789Test";

    const checkMail = email !== values.email;
    const checkPass = password !== values.password;

    const now = new Date();
    const expiredTime = now.getTime() + 24 * 3600;

    const items = {
      values: values,
      expired: expiredTime,
    };

    if (checkMail || checkPass) {
      console.log("invalid account!!");
      setSubmitting(false);
    } else {
      navigate(`/main/`);
      setSubmitting(false);
      localStorage.setItem("account", JSON.stringify(items));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Formik
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                handleSubmit(values, { setSubmitting });
              }}
            >
              {(formikProps) => {
                const {
                  isSubmitting,
                  isValid,
                  values,
                  touched,
                  errors,
                  handleChange,
                } = formikProps;
                return (
                  <Form>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={errors.email && touched.email}
                    />
                    <ErrorMessage name="email">
                      {(msg) => (
                        <p style={{ color: "red", fontSize: "12px" }}>{msg} </p>
                      )}
                    </ErrorMessage>

                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={errors.password && touched.password}
                    />
                    <ErrorMessage name="password">
                      {(msg) => (
                        <p style={{ color: "red", fontSize: "12px" }}>{msg} </p>
                      )}
                    </ErrorMessage>

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Form>
                );
              }}
            </Formik>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
