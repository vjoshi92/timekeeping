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
import { formatDate, formatDDMMMYYYYDateString, StatusColorFormatter, StatusTextFormatting, weekTimesheetFormat } from "utils/AppUtil";
import ApprovalIcon from "@mui/icons-material/Approval";
import { useGetTimesheetWeeklyQuery, useLazyGetTeamTimesheetWeeklyQuery, useLazyGetTimesheetWeeklyQuery } from "api/timesheetApi";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TimeSheetsDatagrid({ searchQuery }) {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const { isManager } = useParams();
  const handleEyeClick = (params) => {
    const allData = params;
    const type = isManager === "true" ? "team" : "my";
    if (allData?.STATUS == '20' && isManager === "true") {
      navigate(`/Review/true/${params?.Pernr}/${params?.BEGDA}/${params?.ENDDA}/${params?.Week}/${type}`, { state: { data: allData } });
    } else {
      navigate(`/Review/false/${params?.Pernr}/${params?.BEGDA}/${params?.ENDDA}/${params?.Week}/${type}`, { state: { data: allData } });
    }
  };

  const MyColumns = [
    {
      field: "weekDate",
      headerName: "TIMESHEET",
      minWidth: 180,
      flex: 1,
      // renderCell: (params) => <Typography>{weekTimesheetFormat(params?.value)}</Typography>,
    },
    {
      field: "Status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          textTransform={"uppercase"}
          sx={{ fontWeight: 600, color: StatusColorFormatter(params?.row?.STATUS), marginTop: "3%", fontSize: "14px " }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "CatsHours",
      headerName: "TOTAL HOURS",
      minWidth: 200,
      hAlign: "Right",
      type: "string",
      flex: 1,
    },
    {
      field: "submitDate",
      headerName: "DATE SUBMITTED",
      minWidth: 200,
      type: "string",
      flex: 1,
    },

    {
      field: "actions",
      headerName: "ACTIONS",
      filterable: false,
      description: "Approve or reject the entry.",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <RemoveRedEyeIcon
            sx={{ color: "#0073E6", cursor: "pointer" }}
            onClick={() => handleEyeClick(params?.row)}
          />
        </Box>
      ),
    },
  ];

  const ManagerColumns = [
    {
      field: "EName",
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
      field: "weekDate",
      headerName: "TIMESHEET",
      minWidth: 180,
      flex: 1,
      // renderCell: (params) => <Typography>{weekTimesheetFormat(params?.value)}</Typography>,
    },
    {
      field: "Status",
      headerName: "STATUS",
      minWidth: 180,
      flex: 1,
      renderCell: (params) => (
        <Typography
          variant="body1"
          textTransform={"uppercase"}
          sx={{ fontWeight: 600, color: StatusColorFormatter(params?.row?.STATUS), marginTop: "3%", fontSize: "14px " }}
        >
          {params.value}
        </Typography>
      ),
    },

    {
      field: "CatsHours",
      headerName: "TOTAL HOURS",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "submitDate",
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
      filterable: false,
      renderCell: (params) => (
        <Box>
          <RemoveRedEyeIcon
            sx={{ color: "#0073E6", cursor: "pointer" }}
            onClick={() => handleEyeClick(params?.row)}
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

  const columns = isManager == "true" ? ManagerColumns : MyColumns;
  const [timesheetData, setTimesheetData] = React.useState([]);

  const [getMyTimesheet,
    { data: myTimesheetData, isSuccess: isMyTimesheetSuccess, isFetching: loadingMyTimesheetData }] = useLazyGetTimesheetWeeklyQuery();
  const [getTeamsTimesheet,
    { data: teamTimesheetData, isSuccess: isTeamTimesheetSuccess, isFetching: loadingTeamTimesheetData }] = useLazyGetTeamTimesheetWeeklyQuery();

  React.useEffect(() => {
    if (isManager === "true") {
      getTeamsTimesheet();
    } else {
      getMyTimesheet();
    }
  }, [isManager]);

  React.useEffect(() => {
    if (isMyTimesheetSuccess) {
      const dataWithRandomIds = myTimesheetData?.results.map(item => ({
        ...item, // Keep existing properties
        weekDate: weekTimesheetFormat(item?.Week),
        Status: StatusTextFormatting(item?.STATUS),
        submitDate: formatDDMMMYYYYDateString(item?.LAEDA),
        id: Math.random(), // Generate a random id for each item
      }));
      setTimesheetData(dataWithRandomIds);
    }

  }, [loadingMyTimesheetData]);

  React.useEffect(() => {
    if (isTeamTimesheetSuccess) {
      const dataWithRandomIds = teamTimesheetData?.results.map(item => ({
        ...item, // Keep existing properties
        weekDate: weekTimesheetFormat(item?.Week),
        Status: StatusTextFormatting(item?.STATUS),
        submitDate: formatDDMMMYYYYDateString(item?.LAEDA),
        id: Math.random(), // Generate a random id for each item
      }));
      setTimesheetData(dataWithRandomIds);
    }
  }, [loadingTeamTimesheetData]);

  React.useEffect(() => {
    if (isManager === "true") {
      const teamsData = teamTimesheetData?.results;
      if (teamsData) {
        const timesheets = [...teamsData];
        if (searchQuery) {
          const filteredData = timesheets.filter(item => item.EName.toLowerCase().includes(searchQuery.toLowerCase()))
          setTimesheetData(filteredData);
        } else {
          setTimesheetData(timesheets);
        }
      }

    }
  }, [searchQuery])

  return (
    <MuiDataGrid
      datagridName={"weeklytimesheet"}
      rows={timesheetData}
      columns={columns}
      pageSize={pageSize}
      loading={loadingMyTimesheetData || loadingTeamTimesheetData}
      page={page}
      onPageChange={(newPage) => setPage(newPage)}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 20]}
      pagination
    />
  )
}
