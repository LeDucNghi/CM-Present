import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import "../../pages/About/about.scss";

import { ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Images } from "constants/images";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const InputInformation = ({ values, touched, errors, handleChange }) => {
  return (
    <>
      <TextField
        fullWidth
        name="firstName"
        label="firstName"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values.firstName}
        onChange={handleChange}
        error={touched.firstName && Boolean(errors.firstName)}
      />

      <ErrorMessage name="firstName" />

      <TextField
        fullWidth
        name="lastName"
        label="lastName"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values.lastName}
        onChange={handleChange}
        error={touched.lastName && Boolean(errors.lastName)}
      />

      <ErrorMessage name="lastName" />

      <TextField
        fullWidth
        name="email"
        label="email"
        margin="normal"
        type="text"
        id="outlined-error-helper-text"
        value={values.email}
        onChange={handleChange}
        error={touched.email && Boolean(errors.email)}
      />

      <ErrorMessage name="email" />

      <TextField
        fullWidth
        margin="normal"
        name="age"
        label="age"
        type="text"
        id="outlined-error-helper-text"
        value={values.age}
        onChange={handleChange}
        error={touched.age && Boolean(errors.age)}
      />
      <ErrorMessage name="age" />

      <TextField
        fullWidth
        margin="normal"
        name="team"
        label="team"
        type="text"
        id="outlined-error-helper-text"
        value={values.team}
        onChange={handleChange}
        error={touched.team && Boolean(errors.team)}
      />
      <ErrorMessage name="team" />

      <TextField
        fullWidth
        margin="normal"
        name="role"
        label="role"
        type="text"
        id="outlined-error-helper-text"
        value={values.role}
        onChange={handleChange}
        error={touched.role && Boolean(errors.role)}
      />

      <ErrorMessage name="role" />
    </>
  );
};

const Avatar = ({ setFieldValue }) => {
  const [image, setImage] = useState(null);

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const img = URL.createObjectURL(e.target.files[0]);
      console.log(
        "🚀 ~ file: account.jsx ~ line 49 ~ onImageChange ~ img",
        img
      );
      setImage(img);
      setFieldValue("image", e.target.files[0]);
    }
  };
  return (
    <>
      <div className="avatar">
        {image ? (
          <img className="preview_img" src={image} alt="preview_image" />
        ) : (
          <img src={Images.DEFAULTUSER} alt="user_avt" />
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
    </>
  );
};

const SubmitButton = ({ languages, isSubmitting, isValid }) => {
  return (
    <>
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
    </>
  );
};

export const ProfileForm = ({
  mode,
  languages,
  isSubmitting,
  isValid,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
}) => {
  return (
    <>
      <div
        className="account_info"
        style={{ color: mode === "dark" ? "#fff" : "" }}
      >
        <InputInformation
          values={values}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
        />
      </div>

      <div className="user_avatar">
        <Avatar setFieldValue={setFieldValue} />
      </div>

      <div className="account_btn">
        <SubmitButton
          isSubmitting={isSubmitting}
          isValid={isValid}
          languages={languages}
        />
      </div>
    </>
  );
};
