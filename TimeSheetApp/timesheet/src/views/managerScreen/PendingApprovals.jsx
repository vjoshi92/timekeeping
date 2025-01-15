import { Box, Button, styled, Typography } from '@mui/material';
import ApprovalsDatagrid from 'views/managerScreen/ApprovalsDatagrid';
import React from 'react';

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
    [theme.breakpoints.up('sm')]: {
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
    return (
        <StyledBox>
            <StyledTypography>
                Pending Approvals
            </StyledTypography>
            <Box sx={{ marginTop: "20px", marginBottom: "40px" }}>
                <ApprovalsDatagrid />
            </Box>
            <StyledMainBox sx={{ gap: { xs: 2, sm: 2 } }}>
                {/* <StyledButton
                    variant="contained"
                    color="#005AA6"
                    sx={{
                        width: { xs: "100%", sm: "200px" },
                        backgroundColor: "#fff",
                        color: "#005AA6",
                        border: "1px solid #005AA6",
                        fontWeight: 700,
                    }}
                >
                    Release Timesheet
                </StyledButton> */}
                {/* <StyledButton
                    variant="contained"
                    color="error"
                    sx={{ width: { xs: "100%", sm: "200px" }, fontWeight: 700, }}
                >
                    Reject
                </StyledButton> */}
                <StyledButton
                    variant="contained"
                    // color="success"
                    sx={{ width: { xs: "100%", sm: "200px" }, fontWeight: 700, backgroundColor: "green" }}
                >
                    Approve
                </StyledButton>
            </StyledMainBox>
        </StyledBox>
    );
};

export default PendingApprovals;
