import "../../pages/About/about.scss";

import { Avatar } from "./avatar";
import React from "react";
import { SubmitButton } from "./submitButton";
import { TextField } from "./textField";

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
        <TextField
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
