import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const NormalInput = styled(TextField)(({ theme }) => (
    {
        "& .MuiOutlinedInput-input": {
            height: "22.5px",
            // marginLeft:"5%",
            padding: "10px",
            fontSize: "16px",
            color: "#333",
            fontWeight: "500"
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: "4px",
        },
    }
));

const DisabledInput = styled(NormalInput)(({ theme }) => (
    {
        "& .MuiOutlinedInput-input": {
            backgroundColor: "#F5F5F5",
        }
    }
));

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
        setText(e.target.value);
    };

    return (
        <>
            {!readOnly && (
                <NormalInput
                    fullWidth
                    size='small'
                    key={key}
                    label={label}
                    defaultValue={value}
                    value={text}
                    rows={rows}
                    multiline={multiline}
                    onBlur={() => onChange(text)}
                    onChange={handleChange}
                    disabled={false}
                    type={type}
                    error={error}
        
                />
            )}

            {readOnly && (
                <DisabledInput
                    fullWidth
                    size='small'
                    key={key}
                    label={label}
                    defaultValue={value}
                    value={text}
                    rows={rows}
                    multiline={multiline}
                    onBlur={() => onChange(text)}
                    onChange={handleChange}
                    disabled={true}
                    type={type}
                    error={error}
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
