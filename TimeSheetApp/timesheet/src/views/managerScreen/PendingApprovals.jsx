import { Box, Button, styled, Typography } from '@mui/material';
import ApprovalsDatagrid from 'components/ApprovalsDatagrid';
import React from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
    padding: theme.spacing(5), // Use theme.spacing for consistent padding
}));

const StyledMainBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column", // Default for smaller screens
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    marginTop: theme.spacing(1.25),
    [theme.breakpoints.up('sm')]: {
        flexDirection: "row", // Changes for larger screens
    },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontSize: "22px",
    fontWeight: 700,
}));

const StyledButton = styled(Button)(({ theme }) => ({
    height: "42px",
}));

const PendingApprovals = () => {
    return (
        <StyledBox>
            <StyledTypography>
                Pending Approvals
            </StyledTypography>
            <Box sx={{ marginTop: "20px" }}>
                <ApprovalsDatagrid />
            </Box>
            <StyledMainBox sx={{ gap: { xs: 2, sm: 4 } }}>
                <StyledButton
                    variant="contained"
                    color="error"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                >
                    Reject
                </StyledButton>
                <StyledButton
                    variant="contained"
                    color="success"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                >
                    Approve
                </StyledButton>
            </StyledMainBox>
        </StyledBox>
    );
};

export default PendingApprovals;
