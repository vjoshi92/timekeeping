import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const NormalInput = styled(TextField)(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
        height: "22.5px",
        padding: "10px",
        fontSize: "16px",
        color: "#333",
        fontWeight: "500"
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "4px",
    },
}));

const DisabledInput = styled(NormalInput)(({ theme }) => ({
    "& .MuiOutlinedInput-input": {
        backgroundColor: "#F5F5F5",
    }
}));

const MuiInput = (props) => {
    const {
        key,
        label,
        value,
        onChange,
        readOnly,
        type = 'text',
        error,
        rows,
        helperText,
        multiline,
    } = props;

    const [text, setText] = useState(value);

    const handleChange = (e) => {
        let inputValue = e.target.value;

        // Remove any non-digit characters
        inputValue = inputValue.replace(/[^\d.]/g, '');

        // Remove all decimal points except the first one
        const parts = inputValue.split('.');
        if (parts.length > 1) {
            inputValue = parts[0] + '.' + parts.slice(1).join('');
        }

        // Ensure only two digits after decimal
        if (parts.length > 1 && parts[1].length > 2) {
            inputValue = parts[0] + '.' + parts[1].substring(0, 2);
        }

        // Add decimal point after two digits if no decimal exists
        if (!inputValue.includes('.') && inputValue.length > 2) {
            inputValue = inputValue.substring(0, 2) + '.' + inputValue.substring(2);
        }

        // Ensure maximum length
        if (inputValue.includes('.')) {
            const [whole, decimal] = inputValue.split('.');
            if (whole.length > 2) {
                inputValue = whole.substring(0, 2) + '.' + (decimal || '');
            }
        }

        setText(inputValue);
        if (onChange) {
            onChange(inputValue);
        }
    };

    return (
        <>
            {!readOnly && (
                <NormalInput
                    fullWidth
                    size='small'
                    key={key}
                    label={label}
                    value={text}
                    rows={rows}
                    multiline={multiline}
                    onChange={handleChange}
                    disabled={false}
                    type="text"
                    error={error}
                    inputProps={{
                        inputMode: 'decimal',
                        pattern: '[0-9]*[.][0-9]*'
                    }}
                />
            )}

            {readOnly && (
                <DisabledInput
                    fullWidth
                    size='small'
                    key={key}
                    label={label}
                    value={text}
                    rows={rows}
                    multiline={multiline}
                    onChange={handleChange}
                    disabled={true}
                    type="text"
                    error={error}
                    inputProps={{
                        inputMode: 'decimal',
                        pattern: '[0-9]*[.][0-9]*'
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
                        display: 'block'
                    }}
                >
                    {helperText}
                </Typography>
            )}
        </>
    );
};

export default MuiInput;