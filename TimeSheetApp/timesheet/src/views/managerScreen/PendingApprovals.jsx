import {
  Alert,
  Box,
  Button,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import ApprovalsDatagrid from "views/managerScreen/ApprovalsDatagrid";
import React, { useEffect, useState } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(5),
}));
const StyledMainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",
  marginTop: theme.spacing(1.25),
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  fontWeight: 700,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: "42px",
  textTransform: "none",
}));

const PendingApprovals = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showApproveAll, setShowApproveAll] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <StyledBox>
      <StyledTypography>Pending Approvals</StyledTypography>
      <Box sx={{ marginTop: "20px", marginBottom: "40px" }}>
        <ApprovalsDatagrid
          setCheckboxChecked={setCheckboxChecked}
          setShowApproveAll={setShowApproveAll}
        />
      </Box>
      <StyledMainBox sx={{ gap: { xs: 2, sm: 2 } }}>
        <StyledButton
          onClick={() => setSnackbarOpen(true)}
          variant="contained"
          disabled={!checkboxChecked && !showApproveAll}
          sx={{
            width: { xs: "100%", sm: "200px" },
            fontWeight: 700,
            backgroundColor: "#41af6e",
          }}
        >
          {checkboxChecked
            ? "Approve"
            : showApproveAll
              ? "Approve All"
              : "Approve"}
        </StyledButton>
      </StyledMainBox>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Timesheet approved successfully.
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};

export default PendingApprovals;
