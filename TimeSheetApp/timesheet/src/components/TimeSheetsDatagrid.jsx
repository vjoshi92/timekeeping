import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Checkbox from '@mui/material/Checkbox';
import MuiDataGrid from './MuiDataGrid';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const columns = [

  {
    field: 'employeeName',
    headerName: 'EMPLOYEE NAME',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'employeeId',
    headerName: 'EMPLOYEE ID',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'timesheet',
    headerName: 'TIMESHEET',
    minWidth: 200,
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'STATUS',
    minWidth: 200,
    flex: 1,
  },

  {
    field: 'totalHours',
    headerName: 'TOTAL HOURS',
    minWidth: 200,
    flex: 1,
    valueGetter: (params) => (params.row?.totalHours ? params.row.totalHours : 'N/A'),
  },
  {
    field: 'dateSubmitted',
    headerName: 'DATE SUBMITTED',
    minWidth: 200,
    flex: 1,
  },

  {
    field: 'actions',
    headerName: 'ACTIONS',
    description: 'Approve or reject the entry.',
    flex: 1,
    renderCell: () => (
      <Box>
        <RemoveRedEyeIcon sx={{ color: '#0073E6', cursor: 'pointer' }} />
      </Box>
    ),
  },
];

const rows = [
  { id: 1, employeeId: '100190', employeeName: 'Jon', timesheet: "23 - 29 Sep 2024", status: "PENDING", totalHours: "40", dateSubmitted: "29-sep-2024" },
  { id: 2, employeeId: '100191', employeeName: 'Alice', timesheet: "23 - 29 Sep 2024", status: "REJECTED", totalHours: "35", dateSubmitted: "29-sep-2024" },
  { id: 3, employeeId: '100192', employeeName: 'Mark', timesheet: "23 - 29 Sep 2024", status: "APPROVED", totalHours: "31", dateSubmitted: "29-sep-2024" },
  { id: 4, employeeId: '100193', employeeName: 'Sara', timesheet: "23 - 29 Sep 2024", status: "PENDING", totalHours: "25", dateSubmitted: "29-sep-2024" },
  { id: 5, employeeId: '100194', employeeName: 'Paul', timesheet: "23 - 29 Sep 2024", status: "LOCKED", totalHours: "35", dateSubmitted: "29-sep-2024" },
];

export default function TimeSheetsDatagrid() {
  return (

    <MuiDataGrid
      rows={rows}
      columns={columns}
    />
  );
}
