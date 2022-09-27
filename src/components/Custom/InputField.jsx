import { ErrorMessage } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { StyledTextField } from "constants/styledMUI";
import { selectMode } from "features/drawer/drawerSlice";
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
  onBlur,
  disabled,
}) => {
  const mode = useSelector(selectMode);

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
        onBlur={onBlur}
        disabled={disabled}
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
  onBlur: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
};

Field.defaultProps = {
  name: "",
  label: "",
  type: "",
  value: "",
  autoComplete: "",
  autoFocus: false,
  disabled: false,
};
