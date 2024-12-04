import React from "react";
import { FormControl, TextField, Autocomplete, Typography } from "@mui/material";

const Dropdown = ({ label, options, value, onChange, sx, readOnly, disabled, error, helperText, description }) => {
  return (
    <FormControl fullWidth error={error}>
      <Autocomplete
        key={label}
        disablePortal
        options={options || []}
        disabled={readOnly}
        getOptionDisabled={(option) => option === "costcenter"}
        sx={{ width: "100%" }}
        value={value || null}
        onChange={onChange}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              sx={{
                "& .MuiInputBase-root": {
                  height: "40px",
                },
                "& .MuiOutlinedInput-root": {
                  height: "40px",
                  backgroundColor: readOnly ? "#F5F5F5" : "transparent",
                  ...(error && {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "red",
                    },
                  }),
                },
              }}
              error={error}
            />
            {error && helperText && (
              <Typography
                color="error"
                fontWeight={600}
                variant="caption"
                sx={{
                  mt: 0.5,
                  ml: 1,
                  display: 'block'
                }}
              >
                {helperText}
              </Typography>
            )}
          </>
        )}
      />
    </FormControl>
  );
};

export default Dropdown;
