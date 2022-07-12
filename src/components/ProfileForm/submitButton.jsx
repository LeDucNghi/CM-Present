import { Button, CircularProgress } from "@mui/material";

import React from "react";

export const SubmitButton = ({ languages, isSubmitting, isValid }) => {
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
