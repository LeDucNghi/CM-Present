import "../../pages/About/about.scss";

import { Avatar } from "./avatar";
import { InputField } from "./inputField";
import React from "react";
import { SubmitButton } from "./submitButton";

export const ProfileForm = ({
  data,
  isSubmitting,
  isValid,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
}) => {
  // const mode = useSelector((state) => state.app.mode);
  // const languages = useSelector((state) => state.app.language);
  return (
    <>
      <div
        className="account_info"
        // style={{ color: mode === "dark" ? "#fff" : "" }}
      >
        <InputField
          values={values}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
        />
      </div>

      <div className="user_avatar">
        <Avatar data={data} setFieldValue={setFieldValue} />
      </div>

      <div className="account_btn">
        <SubmitButton isSubmitting={isSubmitting} isValid={isValid} />
      </div>
    </>
  );
};
