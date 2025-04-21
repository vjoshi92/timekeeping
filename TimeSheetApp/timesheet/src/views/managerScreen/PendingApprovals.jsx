import {
  Alert,
  Box,
  Button,
  Snackbar,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import ApprovalsDatagrid from "views/managerScreen/ApprovalsDatagrid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSaveWeekApprovalMutation } from "api/timesheetApi";
import BusyDialog from "components/BusyLoader";
import { setSelectedPendingApprovals } from "store/slice/TimesheetSlice";
import { Footer } from "components/Footer";

const StyledBox = styled(Box)(({ theme }) => ({
  margin: "1.3rem"
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
  const dispatch = useDispatch();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [showApproveAll, setShowApproveAll] = useState(false);
  const [openApiMsg, setOpenApiMsg] = useState(false);
  const [apiMsg, setApiMsg] = useState("");
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const [saveWeekApproval, { isSuccess: saveWeekSuccess, isLoading: saveWeekLoading, isError: isSaveWeekError,
    error: saveWeekError
  }] = useSaveWeekApprovalMutation();

  const selectedPendingApprovals = useSelector((state) => state?.CreateForm?.selectedPendingApprovals);

  const handleApprove = () => {
    selectedPendingApprovals.forEach(element => {
      const payload = { ...element, STATUS: "30", CatsHours: parseFloat(element?.CatsHours).toFixed(2) };
      delete payload.id;
      delete payload.__metadata;
      delete payload.LAEDA;      
      delete payload.weekDate;
      delete payload.APNAM;
      delete payload.Fullname;
      saveWeekApproval({ body: payload });
    });
  };

  const handleReject = () => {
    selectedPendingApprovals.forEach(element => {
      const payload = { ...element, STATUS: "40", CatsHours: parseFloat(element?.CatsHours).toFixed(2) };
      delete payload.id;
      delete payload.__metadata;
      delete payload.LAEDA;
      delete payload.weekDate;
      delete payload.APNAM;
      delete payload.Fullname;
      saveWeekApproval({ body: payload });
    });
  };

  const approveLineItem = (row) => {
    const payload = { ...row, STATUS: "30", "CatsHours": parseFloat(row?.CatsHours).toFixed(2) };
    delete payload.id;
    delete payload.__metadata;
    delete payload.LAEDA;
    delete payload.weekDate;
    delete payload.APNAM;
    delete payload.Fullname;
    saveWeekApproval({ body: payload });
  };

  const rejectLineItem = (row) => {
    const payload = { ...row, STATUS: "40", "CatsHours": parseFloat(row?.CatsHours).toFixed(2) };
    delete payload.id;
    delete payload.__metadata;
    delete payload.LAEDA;
    delete payload.weekDate;
    delete payload.APNAM;
    delete payload.Fullname;
    saveWeekApproval({ body: payload });
  };


  useEffect(() => {
    if (saveWeekSuccess) {
      setSnackbarOpen(true);
      dispatch(setSelectedPendingApprovals([]));
    }

    if (isSaveWeekError) {
      setApiMsg(saveWeekError);
      setOpenApiMsg(true);
    }
  }, [saveWeekLoading])

  return (
    <>
      <StyledBox>
        <StyledTypography>Pending Approvals</StyledTypography>
        <Box sx={{ marginTop: "20px", marginBottom: "40px" }}>
          <ApprovalsDatagrid
            setCheckboxChecked={setCheckboxChecked}
            setShowApproveAll={setShowApproveAll}
            handleApprove={approveLineItem}
            handleReject={rejectLineItem}
          />
        </Box>
        {/* <StyledMainBox sx={{ gap: { xs: 2, sm: 2 } }}>

      </StyledMainBox> */}
      </StyledBox>
      <Footer>
        {/* <Stack direction={"row"} spacing={2}> */}
          <StyledButton
            onClick={() => handleApprove()}
            variant="contained"
            disabled={!checkboxChecked && !showApproveAll}
            sx={{
              width: { xs: "100%", sm: "200px" },
              fontWeight: 700,
              backgroundColor: "#41af6e",
              marginLeft: "0.3rem"
            }}
          >
            {checkboxChecked
              ? "Approve"
              : showApproveAll
                ? "Approve All"
                : "Approve"}
          </StyledButton>

          {/*
          Reject all commented for now, as it is not required
           <StyledButton
            onClick={() => handleApprove()}
            variant="contained"
            disabled={!checkboxChecked && !showApproveAll}
            sx={{
              width: { xs: "100%", sm: "200px" },
              fontWeight: 700,
              backgroundColor: "error",
              marginLeft: "0.3rem"
            }}
            color="error"
          >
            {checkboxChecked
              ? "Reject"
              : showApproveAll
                ? "Reject All"
                : "Reject"}
          </StyledButton> */}
        {/* </Stack> */}
      </Footer>
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
      <Snackbar
        open={openApiMsg}
        onClose={() => setOpenApiMsg(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenApiMsg(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {apiMsg}
        </Alert>
      </Snackbar>
      <BusyDialog open={saveWeekLoading} />
    </>
  );
};

export default PendingApprovals;
