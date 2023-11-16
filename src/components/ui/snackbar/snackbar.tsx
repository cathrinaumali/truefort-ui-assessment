import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps, AlertColor } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface CustomizedSnackbarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  snackBarMeta: {
    message: string;
    severity: AlertColor;
  };
}
export default function CustomizedSnackbars({
  open,
  setOpen,
  snackBarMeta,
}: CustomizedSnackbarProps) {
  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={snackBarMeta?.severity}
        sx={{ width: "100%" }}
      >
        {snackBarMeta?.message}
      </Alert>
    </Snackbar>
  );
}
