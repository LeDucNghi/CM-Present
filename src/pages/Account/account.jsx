import "./account.scss";

import { Button, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/profile";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "constants/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Account(props) {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="account">
      {/* <div className="account_header">
        <h2>Account information</h2>
      </div> */}
      <Formik
        enableReinitialize={true}
        validationSchema={validationSchema}
        initialValues={initialValues}
        // onSubmit={(values, { setSubmitting }) => {
        //   handleAddUser(values, { setSubmitting });
        // }}
        className="account"
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
            <>
              <Form className="account_info">
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
                <ErrorMessage name="firstName" />

                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="email"
                  type="text"
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
              </Form>

              <div className="user_avatar">
                <div className="avatar">
                  {image ? (
                    <img
                      className="preview_img"
                      src={image}
                      alt="preview_image"
                    />
                  ) : (
                    <img src={Images.EMPTY} alt="user_avt" />
                  )}
                </div>
                <label className="avatar_change_icon">
                  <FontAwesomeIcon
                    className="icon"
                    icon={faCamera}
                    size="3x"
                    style={{ color: "#464646" }}
                  />
                  <input onChange={onImageChange} name="file_avt" type="file" />
                </label>
              </div>
              <div className="account_btn">
                <Button type="button" className="cancel">
                  Cancel
                </Button>
                <Button type="submit" className="apply">
                  Apply
                </Button>
              </div>
            </>
          );
        }}
      </Formik>
    </div>
  );
}
export default Account;
