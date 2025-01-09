import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ApprovalIcon from '@mui/icons-material/Approval';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import MuiDataGrid from 'components/MuiDataGrid';
import { Stack } from '@mui/material';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const StyledBox = styled(Stack)(({ theme }) => ({
  display: 'flex',
  // gap: '10px',
  // marginTop: "15px"
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '& .MuiDataGrid-cell': {
    border: 'none',
    // width:250
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
  '& .MuiDataGrid-columnHeader[data-field="Check"]': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeaders > .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
}));


export default function ApprovalsDatagrid() {
  const navigate = useNavigate();
  const handleEyeClick = (params) => {
    const allData = params.row;
    navigate('/Review/true', { state: { data: allData } });
  };
  const columns = [
    {
      field: 'Check',
      headerName: '',
      sortable: false,
      width: 50,
      renderCell: () => (
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%'
        }}>
          <Checkbox
            {...label}
            sx={{
              padding: 0,
              margin: 0
            }}
          />
        </Box>
      ),
    },
    {
      field: 'employeeName',
      headerName: 'EMPLOYEE NAME',
      width: 210,
      editable: true,
    },
    {
      field: 'employeeId',
      headerName: 'EMPLOYEE ID',
      minWidth: 200,
      flex: 1,
      editable: true,
    },
    {
      field: 'timesheet',
      headerName: 'TIMESHEET',
      minWidth: 200,
      flex: 1,
      editable: true,
    },
    {
      field: 'totalHours',
      headerName: 'TOTAL HOURS',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      minWidth: 200,
      flex: 1,

    },
    {
      field: 'actions',
      headerName: 'ACTIONS',
      description: 'Approve or reject the entry.',
      sortable: false,
      minWidth: 200,
      flex: 1,
      renderCell: (params) => (
        <StyledBox direction={"row"}>
          <RemoveRedEyeIcon sx={{ color: '#0073E6', cursor: 'pointer', marginRight: "10%" }} onClick={() => handleEyeClick(params)} />
          <ApprovalIcon sx={{ color: "#005AA6", marginRight: "10%" }} />
          <CloseIcon color="error" style={{ cursor: 'pointer', marginRight: "10%" }} />
          <CheckIcon color="success" style={{ cursor: 'pointer' }} />
        </StyledBox>
      ),
    },
  ];
  const rows = [
    {
      id: 1,
      employeeId: '100190',
      employeeName: 'Jon doe',
      timesheet: "23 - 29 Sep 2024",
      totalHours: "40",
      status: "Pending",
      treeData: [
        {
          day0: "9",
          day1: "7",
          day2: "5",
          day3: "4",
          day4: "6",
          day5: "0",
          day6: "1",
          project: "JMA NOFO 2 SRFA 1",
          level: "Mechanical Design",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "Technical Documentation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "HW Verification and Validation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "HW Verification and Validation"],
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PO",
          hierarchy: ["Non-NOFO", "P0"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PTO",
          hierarchy: ["Non-NOFO", "PTO"]
        }
      ]



    },
    {
      id: 2,
      employeeId: '100191',
      employeeName: 'Alice wok',
      timesheet: "23 - 29 Sep 2024",
      totalHours: "52",
      status: "Pending",
      treeData: [
        {
          day0: "9",
          day1: "7",
          day2: "5",
          day3: "4",
          day4: "6",
          day5: "0",
          day6: "1",
          project: "JMA NOFO 2 SRFA 1",
          level: "Mechanical Design",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "Technical Documentation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "HW Verification and Validation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "HW Verification and Validation"],
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PO",
          hierarchy: ["Non-NOFO", "P0"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PTO",
          hierarchy: ["Non-NOFO", "PTO"]
        }
      ]

    },
    {
      id: 3,
      employeeId: '100192',
      employeeName: 'Mark doe',
      timesheet: "23 - 29 Sep 2024",
      totalHours: "40",
      status: "Pending",
      treeData: [
        {
          day0: "9",
          day1: "7",
          day2: "5",
          day3: "4",
          day4: "6",
          day5: "0",
          day6: "1",
          project: "JMA NOFO 2 SRFA 1",
          level: "Mechanical Design",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "Technical Documentation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "HW Verification and Validation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "HW Verification and Validation"],
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PO",
          hierarchy: ["Non-NOFO", "P0"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PTO",
          hierarchy: ["Non-NOFO", "PTO"]
        }
      ]

    },
    {
      id: 4,
      employeeId: '100193',
      employeeName: 'Sara liz',
      timesheet: "23 - 29 Sep 2024",
      totalHours: "42",
      status: "Pending",
      treeData: [
        {
          day0: "9",
          day1: "7",
          day2: "5",
          day3: "4",
          day4: "6",
          day5: "0",
          day6: "1",
          project: "JMA NOFO 2 SRFA 1",
          level: "Mechanical Design",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "Technical Documentation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "HW Verification and Validation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "HW Verification and Validation"],
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PO",
          hierarchy: ["Non-NOFO", "P0"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PTO",
          hierarchy: ["Non-NOFO", "PTO"]
        }
      ]

    },
    {
      id: 5,
      employeeId: '100194',
      employeeName: 'Paul heyman',
      timesheet: "23 - 29 Sep 2024",
      totalHours: "40",
      status: "Pending",
      treeData: [
        {
          day0: "9",
          day1: "7",
          day2: "5",
          day3: "4",
          day4: "6",
          day5: "0",
          day6: "1",
          project: "JMA NOFO 2 SRFA 1",
          level: "Mechanical Design",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "Technical Documentation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "JMA NOFO 2 SRFA 1",
          level: "HW Verification and Validation",
          hierarchy: ["JMA NOFO 2 SRFA 1", "HW Verification and Validation"],
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PO",
          hierarchy: ["Non-NOFO", "P0"]
        },
        {
          day0: "",
          day1: "",
          day2: "",
          day3: "",
          day4: "",
          day5: "",
          day6: "",
          project: "Non-NOFO",
          level: "PTO",
          hierarchy: ["Non-NOFO", "PTO"]
        }
      ]

    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <MuiDataGrid
        rows={rows}
        columns={columns}

      />
    </Box>
  );
}
