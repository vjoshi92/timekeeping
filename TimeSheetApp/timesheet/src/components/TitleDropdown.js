import React from "react";
import {
  FormControl,
  TextField,
  Autocomplete,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const TitleDropdown = ({
  label,
  options,
  value,
  onChange,
  sx,
  readOnly,
  disabled,
  error,
  helperText,
  description,
  optionKey,
  optionValue,
}) => {
  const renderOptions = (renderProps, option) => {
    return (
      <React.Fragment key={"main" + renderProps["data-option-index"]}>
        <List
          key={renderProps["data-option-index"]}
          {...renderProps}
          component="nav"
        >
          <ListItem
            key={"item" + renderProps["data-option-index"]}
            disablePadding={true}
            divider={true}
            disableGutters
          >
            <ListItemText
              key={"itemText" + renderProps["data-option-index"]}
              disableTypography={true}
              primary={
                <Typography variant="subtitle2" fontWeight={400} textTransform={"uppercase"}>
                  {option?.value} - {option?.label}
                </Typography>
              }
              onClick={() => { }}
            ></ListItemText>
          </ListItem>
        </List>
      </React.Fragment>
    );
  };
  return (
    <FormControl fullWidth error={error}>
      <Autocomplete
        key={value}
        disablePortal
        options={options || []}
        disabled={readOnly}
        filterOptions={(options, { inputValue }) =>
          options.filter(
            (item) =>
              item?.label?.toLowerCase().includes(inputValue.toLowerCase()) ||
              item?.value?.toLowerCase().includes(inputValue.toLowerCase())
          )
        }
        getOptionDisabled={(option) => option === "costcenter"}
        sx={{ width: "100%", ...sx }}
        value={value || null}
        onChange={onChange}
        renderOption={renderOptions}
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
                  display: "block",
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

export default TitleDropdown;
