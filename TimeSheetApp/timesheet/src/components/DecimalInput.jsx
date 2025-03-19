import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { roundToNearestQuarter } from "utils/AppUtil";

const NormalInput = styled(TextField)(({ theme, error }) => ({
  "& .MuiOutlinedInput-input": {
    height: "22.5px",
    padding: "10px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "500",
    backgroundColor: error ? "#ef0c0c30" : "transparent",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
  },
}));

const DisabledInput = styled(NormalInput)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    backgroundColor: "#F5F5F5",
  },
}));

const DecimalInput = (props) => {
  const {
    key,
    label,
    value,
    onChange,
    readOnly,
    type = "text",
    variant,
    error,
    rows,
    helperText,
    multiline,
    inValidValue
  } = props;

  const [text, setText] = useState(value);

  const handleChange = (e) => {
    let inputValue = e.target.value;

    // Remove any non-digit characters except for the decimal point
    inputValue = inputValue.replace(/[^\d.]/g, "");

    // Remove extra decimal points
    const parts = inputValue.split(".");
    if (parts.length > 1) {
      inputValue = parts[0] + "." + parts.slice(1).join("");
    }

    setText(inputValue);
    // if (onChange) {
    //     onChange(inputValue);
    // }
  };

  const handleBlur = () => {
    if (text) {
      const convertedValue = roundToNearestQuarter(text);
      const formattedValue = parseFloat(convertedValue).toFixed(2);
      setText(formattedValue);
      if (onChange) {
        onChange(formattedValue);
      }
    } else {
      onChange(text);
    }
  };

  return (
    <>
      {!readOnly && (
        <NormalInput
          fullWidth
          size="small"
          key={key}
          label={label}
          value={text}
          rows={rows}
          onBlur={handleBlur}
          multiline={multiline}
          onChange={handleChange}
          disabled={false}
          type="text"
          error={error}
          sx={{
            "& .MuiOutlinedInput-input": {
              color: inValidValue ? "#f44336 !important" : "#333 !important",
            },
          }}
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.][0-9]*",
          }}
        />
      )}

      {readOnly && (
        <DisabledInput
          fullWidth
          size="small"
          key={key}
          label={label}
          value={text}
          rows={rows}
          // onBlur={handleBlur}
          multiline={multiline}
          onChange={handleChange}
          disabled={true}
          type="text"
          error={error}
          inputProps={{
            inputMode: "decimal",
            pattern: "[0-9]*[.][0-9]*",
          }}
        />
      )}
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
  );
};

export default DecimalInput;
