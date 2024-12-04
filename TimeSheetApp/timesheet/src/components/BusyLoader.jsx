import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const BusyLoader = (props) => {
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.open}
    >
      <CircularProgress title="Please wait..." />
    </Backdrop>
  );
};

export default BusyLoader;
