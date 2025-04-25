import * as React from "react";
import Box from "@mui/material/Box";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MuiDataGrid from "./MuiDataGrid";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, Snackbar, Tooltip, Typography } from "@mui/material";
import { formatDDMMMYYYYDateString, sortDatewiseArray, StatusColorFormatter, StatusTextFormatting, weekTimesheetFormat } from "utils/AppUtil";

import UndoIcon from '@mui/icons-material/Undo';
import { useLazyGetTeamTimesheetWeeklyQuery, useLazyGetTimesheetWeeklyQuery, useReleaseWeekTimesheetMutation } from "api/timesheetApi";
import BusyDialog from "./BusyLoader";

export default function TimeSheetsDatagrid({ searchQuery }) {
  const navigate = useNavigate();
  const [pageSize, setPageSize] = React.useState(5);
  const [page, setPage] = React.useState(0);
  const { isManager } = useParams();
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [snackBarSeverity, setSnackBarSeverity] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const handleEyeClick = (params) => {
    const allData = params;
    const type = isManager === "true" ? "team" : "my";
    if (isManager === "true") {
      navigate(`/Review/true/${params?.Pernr}/${params?.BEGDA}/${params?.ENDDA}/${params?.Week}/${type}`, { state: { data: allData } });
    } else {
      navigate(`/Review/false/${params?.Pernr}/${params?.BEGDA}/${params?.ENDDA}/${params?.Week}/${type}`, { state: { data: allData } });
    }
  };

  const [releaseWeek, { isSuccess: saveWeekSuccess, isLoading: saveWeekLoading, isError: isSaveWeekError,
    error: saveWeekError
  }] = useReleaseWeekTimesheetMutation();

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
          sx={{ fontWeight: 600, color: StatusColorFormatter(params?.row?.STATUS), marginTop: "0.9rem", marginBottom: "0.7rem", fontSize: "14px " }}
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
      field: "Fullname",
      headerName: "Approver",
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
        <>
          <Box>
            <RemoveRedEyeIcon
              sx={{ color: "#0073E6", cursor: "pointer" }}
              onClick={() => handleEyeClick(params?.row)}
            />
          </Box>
        </>
      ),
    },
  ];

  const ManagerColumns = [
    {
      field: "weekDate",
      headerName: "TIMESHEET",
      minWidth: 180,
      flex: 1,
    },
    {
      field: "EName",
      headerName: "EMPLOYEE NAME",
      minWidth: 190,
      flex: 1,
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
          sx={{ fontWeight: 600, color: StatusColorFormatter(params?.row?.STATUS), fontSize: "14px", marginTop: "0.9rem", marginBottom: "0.7rem" }}
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
      field: "Fullname",
      headerName: "Approver",
      minWidth: 200,
      type: "string",
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
        <Box sx={{ marginTop: "0.4rem" }}>
          <Tooltip title="View timesheet">
            <RemoveRedEyeIcon
              sx={{ color: "#0073E6", cursor: "pointer" }}
              onClick={() => handleEyeClick(params?.row)}
            />
          </Tooltip>
          {(params?.row?.STATUS == "30") && (
            <Tooltip title="Recall timesheet">
              <UndoIcon onClick={() => handleRelease(params?.row)} sx={{ color: "#0073E6", marginLeft: "1rem", cursor: "pointer" }} />
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
      const aData = sortDatewiseArray(dataWithRandomIds);
      setTimesheetData(aData);
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
      const aData = sortDatewiseArray(dataWithRandomIds);
      setTimesheetData(aData);

    }
  }, [loadingTeamTimesheetData]);

  React.useEffect(() => {
    if (isManager === "true") {
      const teamsData = teamTimesheetData?.results;
      if (teamsData) {
        const timesheets = [...teamsData];
        if (searchQuery) {
          const filteredData = timesheets.filter(item => item.EName.toLowerCase().includes(searchQuery.toLowerCase()));
          const aData = sortDatewiseArray(filteredData);

          setTimesheetData(aData);
        } else {
          setTimesheetData(timesheets);
        }
      }

    }
  }, [searchQuery]);

  const handleRelease = (row) => {
    const payloadForRelease = row;
    const payload = { ...payloadForRelease, CatsHours: parseFloat(payloadForRelease?.CatsHours).toFixed(2) };
    delete payload.id;
    delete payload.__metadata;
    delete payload.LAEDA;
    delete payload.weekDate;
    delete payload.submitDate;
    delete payload.Status;
    // delete payload.APNAM;
    // delete payload.Fullname;
    releaseWeek({ body: payload });
  };

  React.useEffect(() => {
    if (saveWeekSuccess) {
      setSnackBarMsg("Timesheet recalled successfully!!");
      setSnackBarSeverity("success");
      setSnackbarOpen(true);
      getTeamsTimesheet();
    }

    if (isSaveWeekError) {
      setSnackBarMsg(saveWeekError);
      setSnackBarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [saveWeekLoading])

  return (
    <>
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
      <BusyDialog open={saveWeekLoading} />
      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackBarSeverity}
          sx={{ width: "100%" }}
        >
          {snackBarMsg}
        </Alert>
      </Snackbar>
    </>
  )
}
