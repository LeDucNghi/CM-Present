import { Button, CircularProgress } from "@mui/material";

import React from "react";
import { useSelector } from "react-redux";

export const SubmitButton = ({ isSubmitting, isValid }) => {
  // const mode = useSelector((state) => state.app.mode);
  const languages = useSelector((state) => state.app.language);
  return (
    <>
      <Button
        disabled={isSubmitting || !isValid}
        type="submit"
        className="apply"
      >
        {isSubmitting ? (
          <CircularProgress color="success" />
        ) : languages === "Eng" ? (
          "Save"
        ) : (
          "Lưu"
        )}
      </Button>
    </>
  );
};
