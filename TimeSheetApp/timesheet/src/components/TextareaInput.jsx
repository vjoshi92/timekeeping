import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const NormalTextarea = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
   
    fontSize: "16px",
    color: "#333",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
  },
  "& .MuiOutlinedInput-root.Mui-disabled": {
    padding: "0",
  }
}));

const DisabledTextarea = styled(NormalTextarea)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    backgroundColor: "#F5F5F5",
  }
}));

const MuiTextarea = (props) => {
  const {
    key,
    label,
    value,
    onChange,
    readOnly,
    rows = 3,
    height,
    required,
    error,
    helperText,
  } = props;

  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setText(newValue);
    if (!readOnly) {
      onChange(newValue);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {!readOnly ? (
        <NormalTextarea
          key={key}
          label={label}
          value={text}
          onChange={handleChange}
          multiline
          rows={rows}
          maxRows={rows}
          className="w-full"
          error={error}
          required={required}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: height || "auto",
            }
          }}
        />
      ) : (
        <DisabledTextarea
          key={key}
          label={label}
          value={text}
          multiline
          rows={rows}
          maxRows={rows}
          disabled={true}
          className="w-full bg-gray-100"
          error={error}
          required={required}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              height: height || "auto",
            }
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
            ml: 2,
            display: 'block'
          }}
        >
          {helperText}
        </Typography>
      )}
    </div>
  );
};

export default MuiTextarea;
