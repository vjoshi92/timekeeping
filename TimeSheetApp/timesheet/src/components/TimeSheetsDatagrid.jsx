import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Checkbox from "@mui/material/Checkbox";
import MuiDataGrid from "./MuiDataGrid";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip, Typography } from "@mui/material";
import { StatusColorFormatter } from "utils/AppUtil";
import ApprovalIcon from "@mui/icons-material/Approval";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TimeSheetsDatagrid() {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const handleEyeClick = (params) => {
    const allData = params.row;
    navigate("/Review/false", { state: { data: allData } });
  };
  const MyColumns = [
    {
      field: "timesheet",
      headerName: "TIMESHEET",
      minWidth: 200,
      flex: 1,
    },

    {
      headerName: "STATUS",
      field: "status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <Typography
          variant="body1"
          textTransform={"uppercase"}
          sx={{ fontWeight: "600", color: StatusColorFormatter(params.value), marginTop: "2%", fontSize: "14px" }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "totalHours",
      headerName: "TOTAL HOURS",
      minWidth: 200,
      hAlign: "Right",
      flex: 1,
    },
    {
      field: "dateSubmitted",
      headerName: "DATE SUBMITTED",
      minWidth: 200,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "ACTIONS",
      description: "Approve or reject the entry.",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <RemoveRedEyeIcon
            sx={{ color: "#0073E6", cursor: "pointer" }}
            onClick={() => handleEyeClick(params)}
          />
        </Box>
      ),
    },
  ];

  const ManagerColumns = [
    {
      field: "employeeName",
      headerName: "EMPLOYEE NAME",
      minWidth: 190,
      flex: 1,
    },
    // {
    //   field: "employeeId",
    //   headerName: "EMPLOYEE ID",
    //   minWidth: 170,
    //   flex: 1,
    // },
    {
      field: "timesheet",
      headerName: "TIMESHEET",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          textTransform={"uppercase"}
          sx={{ fontWeight: 600, color: StatusColorFormatter(params.value), marginTop: "3%", fontSize: "14px " }}
        >
          {params.value}
        </Typography>
      ),
    },

    {
      field: "totalHours",
      headerName: "TOTAL HOURS",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "dateSubmitted",
      headerName: "DATE SUBMITTED",
      minWidth: 190,
      flex: 1,
    },

    {
      field: "actions",
      headerName: "ACTIONS",
      description: "Approve or reject the entry.",
      minWidth: 190,
      flex: 1,
      renderCell: (params) => (
        <Box>
          <RemoveRedEyeIcon
            sx={{ color: "#0073E6", cursor: "pointer" }}
            onClick={() => handleEyeClick(params)}
          />
          {params?.row?.status == "APPROVED" && (
            <Tooltip title="Release timesheet">
              <ApprovalIcon sx={{ color: "#005AA6", marginLeft: "1rem" }} />
            </Tooltip>
          )}
        </Box>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      employeeId: "100190",
      employeeName: "Jon Doe",
      timesheet: "23 - 29 Sep 2024",
      status: "PENDING",
      totalHours: "40",
      dateSubmitted: "29-Sep-2024",
    },
    {
      id: 2,
      employeeId: "100191",
      employeeName: "Alice Wok",
      timesheet: "16 - 22 Sep 2024",
      status: "REJECTED",
      totalHours: "40",
      dateSubmitted: "23-Sep-2024",
    },
    {
      id: 3,
      employeeId: "100192",
      employeeName: "Mark Doe",
      timesheet: "09 - 15 Sep 2024",
      status: "APPROVED",
      totalHours: "40",
      dateSubmitted: "16-Sep-2024",
    },
    {
      id: 4,
      employeeId: "100193",
      employeeName: "Sara Liz",
      timesheet: "02 - 08 Sep 2024",
      status: "APPROVED",
      totalHours: "52",
      dateSubmitted: "09-Sep-2024",
    },
    {
      id: 5,
      employeeId: "100194",
      employeeName: "Paul Heyman",
      timesheet: "26 Aug 2024 - 01 Sep 2024",
      status: "LOCKED",
      totalHours: "40",
      dateSubmitted: "02-Sep-2024",
    },
  ];
  const { isManager } = useParams();
  const columns = isManager == "true" ? ManagerColumns : MyColumns;

  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      pagination
    />
  )
}
