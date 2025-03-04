import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';
import Search from './Search';

const StyledStack = styled(Stack)({
  width: 300
})

export default function EmployeeSearch({ onSearch }) {
  return (
    <StyledStack spacing={2} >
      <Search
        freeSolo
        size='small'
        label={"Search by Employee"}
        onSearch={onSearch}
      />
    </StyledStack>
  );
}