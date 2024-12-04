import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';

const MemoizedTextField = React.memo(({ paybackPeriod, onChange, onBlur }) => {
    return (
      <TextField
        name="PaybackPeriod"
        value={paybackPeriod}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  });
