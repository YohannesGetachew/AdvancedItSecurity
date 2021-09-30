import React, { useState } from "react";
import PropTypes from "prop-types";
import message from "vanilla-antd-message";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackbarError = ({ message }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error">
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarError.propTypes = {
  message: PropTypes.string.isRequired,
};

const AlertError = ({ message, variant }) => {
  return (
    <Alert style={{ padding: "2px 10px" }} variant={variant} severity="error">
      {message}
    </Alert>
  );
};

AlertError.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string,
};
AlertError.defaultProps = {
  variant: "filled",
  message: "Something went wrong. Try reloading or check your connection",
};

const popupError = (errorMessage) => {
  return message.error(errorMessage);
};

export { SnackbarError, popupError, AlertError };
