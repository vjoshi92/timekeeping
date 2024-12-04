import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Checkbox from '@mui/material/Checkbox';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [
    
  {
    field: 'employeeName',
    headerName: 'EMPLOYEE NAME',
    width: 200,
    editable: true,
  },
  {
    field: 'employeeId',
    headerName: 'EMPLOYEE ID',
    width: 200,
    editable: true,
  },
  {
    field: 'timesheet',
    headerName: 'TIMESHEET',
    width: 200,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    width: 200,
    editable: true,
  },

  {
    field: 'totalHours',
    headerName: 'TOTAL HOURS',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 200,
    valueGetter: (params) => (params.row?.totalHours ? params.row.totalHours : 'N/A'),
  },
  {
    field: 'dateSubmitted',
    headerName: 'DATE SUBMITTED',
    width: 200,
    editable: true,
  },

  {
    field: 'actions',
    headerName: 'ACTIONS',
    description: 'Approve or reject the entry.',
    sortable: false,
    width: 160,
    renderCell: () => (
      <Box sx={{ display: 'flex', gap: '10px' , marginTop:"15px" }}>
      <RemoveRedEyeIcon sx={{ color: '#0073E6', cursor: 'pointer' }} />
      </Box>
    ),
  },
];

const rows = [
  { id: 1, employeeId: '100190', employeeName: 'Jon', timesheet: "23 - 29 Sep 2024", status:"PENDING" ,  totalHours: "40" , dateSubmitted:"29-sep-2024" },
  { id: 2, employeeId: '100191', employeeName: 'Alice', timesheet: "23 - 29 Sep 2024", status:"REJECTED" ,  totalHours: "35" , dateSubmitted:"29-sep-2024" },
  { id: 3, employeeId: '100192', employeeName: 'Mark', timesheet: "23 - 29 Sep 2024",  status:"APPROVED" ,  totalHours: "31" , dateSubmitted:"29-sep-2024"},
  { id: 4, employeeId: '100193', employeeName: 'Sara', timesheet: "23 - 29 Sep 2024",  status:"PENDING" ,  totalHours: "25" , dateSubmitted:"29-sep-2024" },
  { id: 5, employeeId: '100194', employeeName: 'Paul', timesheet: "23 - 29 Sep 2024",  status:"LOCKED" ,  totalHours: "35" , dateSubmitted:"29-sep-2024" },
];

export default function TimeSheetsDatagrid() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
  <DataGrid
  rows={rows}
  columns={columns}
  hideFooter
  pageSizeOptions={[5]}
  checkboxSelection={false}
  disableColumnSelector
  disableRowSelectionOnClick
  sx={{
    border: 'none',
    '& .MuiDataGrid-cell': {
      border: 'none',
    },
    '& .MuiDataGrid-columnHeaders': {
      border: 'none',
      backgroundColor: "#BDBDBD",
    },
    '& .MuiDataGrid-columnSeparator': {
      color: "black",
    },
    '& .MuiDataGrid-cell[data-field="timesheet"]': {
      color: '#0073E6',
    },
    "& .MuiDataGrid-columnHeader": {
        backgroundColor: "#EEEEEE",
        color: "#121212DE",
        fontWeight: "700",
        fontSize: "16px",
      },
  }}
/>
    </Box>
  );
}
