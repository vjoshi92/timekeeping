import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import styled from "@emotion/styled";

const StyledStack = styled(Stack)(({ theme }) => ({
    width: "100%", // Default to full width
    [theme.breakpoints.up("md")]: {
        width: 300, // Set fixed width on medium+ screens
    },
}));

export default function Search({ label, onSearch }) {
    const handleSearchChange = (event) => {
        const searchQuery = event.target.value;
        onSearch(searchQuery);
    };

    return (
        <StyledStack spacing={2}>
            <TextField
                fullWidth
                label={label}
                type="search"
                onChange={handleSearchChange}
                sx={{
                    "& .MuiInputBase-root": {
                        height: "38px",
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
            />
        </StyledStack>
    );
}
