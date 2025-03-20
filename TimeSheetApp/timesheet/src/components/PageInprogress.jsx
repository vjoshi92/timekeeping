import React from "react";
import { Container, Typography, Box, Button, Paper, Stack } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import BuildIcon from "@mui/icons-material/Build";
import EngineeringIcon from "@mui/icons-material/Engineering";

const PageInProgress = () => {

    return (
        <Container maxWidth="md" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Paper elevation={3} sx={{ padding: 5, textAlign: "center", borderRadius: 3 }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                    <Stack direction={"row"} spacing={2}>
                        <EngineeringIcon color="primary" sx={{ fontSize: 80 }} />
                        <ConstructionIcon color="warning" sx={{ fontSize: 80 }} />
                    </Stack>
                    <Typography variant="h4" color="textPrimary" fontWeight="bold">
                        Page Under Construction
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        We're working hard to bring this page to life. Check back soon!
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default PageInProgress;
