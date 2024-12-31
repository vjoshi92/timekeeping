import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const StyledStack = styled(Stack)({
  width: 300 
})

export default function EmployeeSearch() {
  return (
    <StyledStack spacing={2} >
      <Autocomplete
        freeSolo
        size='small'
        id="free-solo-2-demo"
        disableClearable
        options={employees.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search by Employee"
            slotProps={{
              input: {
                ...params.InputProps,
                type: 'search',
                endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
              },
            }}
          />
        )}
      />
    </StyledStack>
  );
}

const employees = [
  { name: "John Smith", id: "E001", department: "Engineering" },
  { name: "Sarah Johnson", id: "E002", department: "Marketing" },
  { name: "Michael Brown", id: "E003", department: "Finance" },
  { name: "Emily Davis", id: "E004", department: "Human Resources" },
  { name: "James Wilson", id: "E005", department: "Engineering" },
  { name: "Lisa Anderson", id: "E006", department: "Marketing" },
  { name: "David Martinez", id: "E007", department: "Finance" },
  { name: "Jennifer Taylor", id: "E008", department: "Human Resources" },
  { name: "Robert Thomas", id: "E009", department: "Engineering" },
  { name: "Jessica White", id: "E010", department: "Marketing" },
  { name: "William Lee", id: "E011", department: "Finance" },
  { name: "Elizabeth Clark", id: "E012", department: "Human Resources" },
  { name: "Christopher Rodriguez", id: "E013", department: "Engineering" },
  { name: "Amanda Moore", id: "E014", department: "Marketing" },
  { name: "Daniel Jackson", id: "E015", department: "Finance" },
  { name: "Michelle Garcia", id: "E016", department: "Human Resources" },
  { name: "Joseph Martin", id: "E017", department: "Engineering" },
  { name: "Ashley Thompson", id: "E018", department: "Marketing" },
  { name: "Kevin Robinson", id: "E019", department: "Finance" },
  { name: "Stephanie Lewis", id: "E020", department: "Human Resources" }
];