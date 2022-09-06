import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/addUser";
import { selectLanguage, selectMode } from "features/drawer/drawerSlice";
import { useDispatch, useSelector } from "react-redux";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import { Field } from "components/Custom/InputField";
import Modal from "@mui/material/Modal";
import { handleAddUser } from "../userThunk";
import { selectIsLoading } from "../userSlice";

export default function AddUserForm({ open, setOpen }) {
  const dispatch = useDispatch();

  const mode = useSelector(selectMode);
  const languages = useSelector(selectLanguage);
  const isLoading = useSelector(selectIsLoading);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: `${mode === "dark" ? "#121212" : "background.paper"}`,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
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
              onSubmit={(values) => {
                dispatch(handleAddUser(values, setOpen));
              }}
            >
              {(formikProps) => {
                const {
                  isValid,
                  values,
                  touched,
                  errors,
                  handleChange,
                  handleBlur,
                } = formikProps;
                return (
                  <Form>
                    <Field
                      name="firstName"
                      label={languages === "VN" ? "Tên họ" : "First name"}
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.firstName && Boolean(errors.firstName)}
                    />

                    <Field
                      name="lastName"
                      label={languages === "VN" ? "Tên cuối" : "Last name"}
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastName && Boolean(errors.lastName)}
                    />

                    <Field
                      name="email"
                      label="email"
                      type="text"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                    />

                    <Field
                      name="age"
                      label={languages === "VN" ? "Tuổi" : "Age"}
                      type="text"
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.age && Boolean(errors.age)}
                    />

                    <Field
                      name="role"
                      label={languages === "VN" ? "Chức vụ" : "Role"}
                      type="text"
                      value={values.role}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.role && Boolean(errors.role)}
                    />

                    <Field
                      name="team"
                      label={languages === "VN" ? "Nhóm" : "Team"}
                      type="text"
                      value={values.team}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.team && Boolean(errors.team)}
                    />

                    <Field
                      name="project"
                      label={languages === "VN" ? "Dự án" : "Projects"}
                      type="text"
                      value={values.project}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.project && Boolean(errors.project)}
                    />

                    <Box
                      sx={{
                        margin: "1em auto",
                        display: "flex",
                        justifyContent: "center",

                        ":disabled": {
                          background: `${
                            mode === "dark" ? "rgba(255, 255, 255, 0.12)" : ""
                          }`,
                          color: `${
                            mode === "dark" ? "rgba(255, 255, 255, 0.5)" : ""
                          }`,
                        },
                      }}
                    >
                      <Button
                        disabled={isLoading || !isValid}
                        variant="contained"
                        type="submit"
                      >
                        {isLoading === true ? (
                          <CircularProgress size={25} />
                        ) : languages === "VN" ? (
                          "Thêm"
                        ) : (
                          "Add"
                        )}
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
