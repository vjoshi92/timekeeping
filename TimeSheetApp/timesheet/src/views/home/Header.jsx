import { Box, Grid2, Typography } from "@mui/material";
import React from "react";

const Header = () => {
  const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#143596",
    color: "white",
    padding: 2,
    borderRadius: 2,
  }));

  return (
    <StyledBox>
      <Grid2 container spacing={2}>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">Project</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">NET VALUE</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">REWORK</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">PENDING APPP.</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">PURCHASE REQUESTS</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">PURCHASE ORDERS</Typography>
        </Grid2>
        <Grid2 item xs={12} sm={2}>
          <Typography variant="h6">RECEIVE GOODS</Typography>
        </Grid2>
      </Grid2>
    </StyledBox>
  );
};

export default Header;
