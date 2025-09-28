import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message }) {
  //   const handleClick = () => {
  //     setOpen(open);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          //   onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
