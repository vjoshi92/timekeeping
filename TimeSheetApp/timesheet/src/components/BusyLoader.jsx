import { Backdrop, CircularProgress } from "@mui/material";
import React, { useState } from "react";

const BusyDialog = ({ open }) => {
  const [opendialog, setOpenDialog] = useState(open);
  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BusyDialog;
