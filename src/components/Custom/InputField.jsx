import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { StyledTextField } from "constants/styledMUI";
import { useSelector } from "react-redux";

export const Field = ({
  name,
  label,
  type,
  value,
  onChange,
  error,
  autoComplete,
  autoFocus,
}) => {
  const mode = useSelector((state) => state.app.mode);

  return (
    <>
      <StyledTextField
        fullWidth
        name={name}
        label={label ? label : name}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        focused={mode === "dark" ? true : false}
        mode={mode}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        margin="normal"
        id="outlined-error-helper-text"
        color="secondary"
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

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
};

Field.defaultProps = {
  name: "",
  label: "",
  type: "",
  value: "",
  autoComplete: "",
  autoFocus: false,
};
