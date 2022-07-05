import "./account.scss";

import { Button, TextField } from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import { initialValues, validationSchema } from "formik/profile";
import { useEffect, useState } from "react";
import {
  useGetDetaillUserQuery,
  useUpdateUserMutation,
} from "services/userServices";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "constants/images";
import { Loading } from "components/Loading";
import Swal from "sweetalert2";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function Account({ mode, languages }) {
  const { id } = useParams();
  const { data, error, isLoading } = useGetDetaillUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  console.log("🚀 ~ file: account.jsx ~ line 17 ~ Account ~ data", data);

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    console.log("🚀 ~ file: account.jsx ~ line 16 ~ Account ~ params", id);
  }, []);

  const handleUpdateUser = (values, { setSubmitting }) => {
    console.log("🚀 ~ file: account.jsx ~ line 37 ~ handleUpdateUser ~ id", id);
    updateUser({ ...values, id: id });
    Swal.fire("Update user successfully!", "", "success");
  };

  if (isLoading) return <Loading />;
  else
    return (
      <div className="account">
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting }) => {
            handleUpdateUser(values, { setSubmitting });
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
              <>
                <Form>
                  <div className="account_info">
                    <TextField
                      sx={{
                        "& .MuiTextField-root": {
                          borderColor:
                            mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
                        },
                      }}
                      margin="normal"
                      fullWidth
                      name="firstName"
                      label="firstName"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      // value={data ? data.firstName : values.firstName}
                      defaultValue={data.firstName}
                      onChange={handleChange}
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={errors.firstName && touched.firstName}
                    />
                    <ErrorMessage name="firstName" />

                    <TextField
                      sx={{
                        "& .MuiTextField-root": {
                          borderColor:
                            mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
                        },
                      }}
                      margin="normal"
                      fullWidth
                      name="lastName"
                      label="lastName success"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      // value={data ? data.lastName : values.lastName}
                      defaultValue={data.lastName}
                      onChange={handleChange}
                      error={touched.lastName && Boolean(errors.lastName)}
                      helperText={errors.lastName && touched.lastName}
                      // color={mode === "dark" ? "success" : ""}
                      color="success"
                    />
                    <ErrorMessage name="firstName" />

                    <TextField
                      sx={{
                        // "& .MuiTextField-root": {
                        //   borderColor: mode === "dark" ? "red" : "",
                        // },
                        borderColor: mode === "dark" ? "red" : "",
                      }}
                      margin="normal"
                      fullWidth
                      name="email"
                      label="email"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      // value={data ? data.email : values.email}
                      defaultValue={data.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={errors.email && touched.email}
                    />
                    <ErrorMessage name="firstName" />

                    <TextField
                      sx={{
                        "& .MuiTextField-root": {
                          borderColor:
                            mode === "dark" ? "rgba(255, 255, 255, 0.12)" : "",
                        },
                      }}
                      margin="normal"
                      fullWidth
                      name="age"
                      label="age"
                      type="text"
                      id="outlined-error-helper-text"
                      //   autoComplete="current-password"
                      // value={data ? data.age : values.age}
                      defaultValue={data.age}
                      onChange={handleChange}
                      error={touched.age && Boolean(errors.age)}
                      helperText={errors.age && touched.age}
                    />
                    <ErrorMessage name="age" />
                  </div>

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
                      <input
                        onChange={onImageChange}
                        name="file_avt"
                        type="file"
                      />
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
                </Form>
              </>
            );
          }}
        </Formik>
      </div>
    );
}
export default Account;
