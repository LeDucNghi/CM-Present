import "../../../pages/About/About.scss";

import { Button, CircularProgress } from "@mui/material";

import { Avatar } from "./Avatar";
import { InputField } from "./InputField";
import { selectLanguage } from "features/drawer/drawerSlice";
import { selectLoading } from "features/profile/profileSlice";
import { useSelector } from "react-redux";

export const ProfileForm = ({
  data,
  isValid,
  values,
  touched,
  errors,
  handleChange,
  setFieldValue,
}) => {
  // const mode = useSelector(selectMode);
  const isLoading = useSelector(selectLoading);
  const languages = useSelector(selectLanguage);
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
        <Button
          disabled={isLoading || !isValid}
          type="submit"
          className="apply"
        >
          {isLoading ? (
            <CircularProgress color="success" />
          ) : languages === "Eng" ? (
            "Save"
          ) : (
            "Lưu"
          )}
        </Button>
      </div>
    </>
  );
};
