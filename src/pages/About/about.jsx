import "./about.scss";

import { Button, CircularProgress, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { validationSchema } from "formik/profile";
import { useState } from "react";
import {
  useGetDetaillUserQuery,
  useUpdateUserMutation,
} from "services/userServices";

import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Loading } from "components/Loading";
import { Images } from "constants/images";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function About({ mode, languages }) {
  const { id } = useParams();
  const { data, error, isLoading } = useGetDetaillUserQuery(id);
  const [updateUser, responseInfo] = useUpdateUserMutation();

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0]);
      console.log(
        "🚀 ~ file: account.jsx ~ line 49 ~ onImageChange ~ img",
        img
      );
      setImage(img);
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdateUser = (values, { setSubmitting }) => {
    updateUser({ ...values, id: id });
    setTimeout(() => {
      setSubmitting(false);
      Swal.fire("Update user successfully!", "", "success");
    }, 2000);
  };

  if (isLoading) return <Loading />;
  if (error) console.log(error);
  else
    return (
      <div className="account">
        <Formik
          enableReinitialize={true}
          validationSchema={validationSchema}
          initialValues={{
            firstName: `${data ? data.firstName : ""}`,
            lastName: `${data ? data.lastName : ""}`,
            email: `${data ? data.email : ""}`,
            age: `${data ? data.age : ""}`,
          }}
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
              <Form>
                <div
                  className="account_info"
                  style={{ color: mode === "dark" ? "#fff" : "" }}
                >
                  <TextField
                    margin="normal"
                    fullWidth
                    name="firstName"
                    label="firstName"
                    type="text"
                    id="outlined-error-helper-text"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={errors.firstName && touched.firstName}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="lastName"
                    label="lastName"
                    type="text"
                    id="outlined-error-helper-text"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={errors.lastName && touched.lastName}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="email"
                    label="email"
                    type="text"
                    id="outlined-error-helper-text"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={errors.email && touched.email}
                  />

                  <TextField
                    margin="normal"
                    fullWidth
                    name="age"
                    label="age"
                    type="text"
                    id="outlined-error-helper-text"
                    value={values.age}
                    onChange={handleChange}
                    error={touched.age && Boolean(errors.age)}
                    helperText={errors.age && touched.age}
                  />
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
                  <Button
                    disabled={isSubmitting || !isValid}
                    type="button"
                    className="cancel"
                  >
                    {languages === "Eng" ? "Cancel" : "Huy"}
                  </Button>

                  <Button
                    disabled={isSubmitting || !isValid}
                    type="submit"
                    className="apply"
                  >
                    {isSubmitting ? (
                      <CircularProgress color="success" />
                    ) : languages === "Eng" ? (
                      "Apply"
                    ) : (
                      "Luu"
                    )}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
}
export default About;
