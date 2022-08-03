import "../../../pages/About/About.scss";

import { Avatar } from "./Avatar";
import { InputField } from "./InputField";
import React from "react";
import { SubmitButton } from "./SubmitButton";

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
      <div className="account_info">
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
