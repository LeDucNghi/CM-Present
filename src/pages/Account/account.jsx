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
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { postUserInfo } from "features/slice";

const useStyles = makeStyles({
  root: {
    borderColor: "red",
  },
});

function Account({ mode, languages }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, error, isLoading, isSuccess } = useGetDetaillUserQuery(id);
  const [updateUser] = useUpdateUserMutation();
  // const userInfos = useSelector((state) => state.app.userInfo);

  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(postUserInfo(data));
  //     console.log("🚀 ~ file: account.jsx ~ line 33 ~ Account ~ data", data);
  //   }
  // }, [isSuccess]);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpdateUser = (values, { setSubmitting }) => {
    console.log(
      "🚀 ~ file: account.jsx ~ line 50 ~ handleUpdateUser ~ values",
      values
    );
    // updateUser({ ...values, id: id });
    Swal.fire("Update user successfully!", "", "success");
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
                  {/* <ErrorMessage name="firstName" /> */}

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
                  {/* <ErrorMessage name="firstName" /> */}

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
                  {/* <ErrorMessage name="firstName" /> */}

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
                  {/* <ErrorMessage name="age" /> */}
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
                    {languages === "Eng" ? "Cancel" : "Huy"}
                  </Button>
                  <Button type="submit" className="apply">
                    {languages === "Eng" ? "Apply" : "Luu"}
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
}
export default Account;
