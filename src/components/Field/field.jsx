import { StyledTextField } from "constants/styledMUI";
import { ErrorMessage } from "formik";
import React from "react";
import { useSelector } from "react-redux";

export const Field = ({ name, type, value, onChange, error }) => {
  const mode = useSelector((state) => state.app.mode);

  return (
    <>
      <StyledTextField
        fullWidth
        name={name}
        label={name}
        margin="normal"
        type={type}
        id="outlined-error-helper-text"
        value={value}
        onChange={onChange}
        error={error}
        color="secondary"
        focused={mode === "dark" ? true : false}
        mode={mode}
      />
      <ErrorMessage name={name}>
        {(msg) => (
          <p
            style={{
              color: "red",
              fontSize: "12px",
            }}
          >
            {msg}{" "}
          </p>
        )}
      </ErrorMessage>
    </>
  );
};
