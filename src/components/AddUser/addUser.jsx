import * as React from "react";

import { ErrorMessage, Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/addUser";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { postUserInfo } from "features/slice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddUser({ open, setOpen }) {
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const handleAddUser = (values, { setSubmitting }) => {
    dispatch(postUserInfo(values));
    setTimeout(() => {
      setSubmitting(false);
      setOpen(false);
      Swal.fire("Added user successfully!", "", "success");
    }, 1500);
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Formik
              enableReinitialize={true}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting }) => {
                handleAddUser(values, { setSubmitting });
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
                      fullWidth
                      name="firstName"
                      label="firstName"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      value={values.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={errors.firstName && touched.firstName}
                    />
                    <ErrorMessage name="firstName" />

                    <TextField
                      margin="normal"
                      fullWidth
                      name="lastName"
                      label="lastName"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      value={values.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={errors.lastName && touched.lastName}
                    />
                    <ErrorMessage name="lastName" />

                    <TextField
                      margin="normal"
                      fullWidth
                      name="email"
                      label="email"
                      type="email"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={errors.email && touched.email}
                    />
                    <ErrorMessage name="firstName" />

                    <TextField
                      margin="normal"
                      fullWidth
                      name="age"
                      label="age"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      value={values.age}
                      onChange={handleChange}
                      error={touched.age && Boolean(errors.age)}
                      helperText={errors.age && touched.age}
                    />
                    <ErrorMessage name="age" />

                    <TextField
                      margin="normal"
                      fullWidth
                      name="role"
                      label="role"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      value={values.role}
                      onChange={handleChange}
                      error={touched.role && Boolean(errors.role)}
                      helperText={errors.role && touched.role}
                    />
                    <ErrorMessage name="role" />

                    <Box
                      sx={{
                        margin: "1em auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        disabled={isSubmitting || !isValid}
                        variant="contained"
                        type="submit"
                      >
                        {isSubmitting ? <CircularProgress size={25} /> : "Add"}
                      </Button>
                    </Box>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
