import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  Fade,
  IconButton,
  Modal,
  Popper,
  Snackbar,
  Stack,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import MuiDataGrid from "../../components/MuiDataGrid";
import { getCurrentWeekDays, PRColumns } from "../../constant/Columns";
import DateRangePickerWithButtonField from "../../components/DateRangeButtonFeild";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import dayjs from "dayjs";
import { DaysColumns } from "components/CurrentWeekColumns";
import { RowsDataColumns } from "components/RowsDataColumn";

import TreeGrid from "components/TreeGrid";
import MuiInput from "components/MuiInput";
import { useLocation } from "react-router-dom";
import { ReviewColumns } from "components/ReviewColumns";
import { ArrowBackIosNew } from "@mui/icons-material";
import { setDateRange } from "store/slice/HomeSlice";
import { setProjectData, setStatus } from "store/slice/TimesheetSlice";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Dropdown from "components/Dropdown";
import {
  formatDate,
  getODataFormatDate,
  getWeekStartDate,
  odataGetDateFormat,
  PrepareApprovalBatchPayload,
  PrepareBatchPayload,
  StatusCaseFormatting,
  StatusColorFormatter,
  StatusTextFormatting,
} from "utils/AppUtil";
import {
  useGetRejectedReasonsQuery,
  useGetUserDataQuery,
  useLazyGetDateWiseDetailsQuery,
  useLazyGetReviewDetailDataQuery,
  useMakeApprovalBatchCallMutation,
  useMakeBatchCallMutation,
} from "api/timesheetApi";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "#FFFFFF",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const StyledTypography = styled(Typography)({
  color: "#0073E6",
  fontWeight: "500",
});

const ApprovalBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "400px",
  height: "110px",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
}));

const RejectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "400px",
  // height: "32%",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
}));

const RejectionMainBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5%",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 2,
  top: -30,
  color: "#fff",
}));

const MainBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
}));

const SubBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const SubModalstyle = {
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 100,
  bgcolor: "#FFFF",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  lineHeight: "26px",
  fontWeight: "500",
  padding: "0 8px",
  borderRadius: "4px",
}));

const RejectButton = styled(Button)(({ theme }) => ({
  height: "42px",
}));

const ReworkButton = styled(Button)(({ theme }) => ({
  height: "42px",
  textTransform: "none",
  width: { xs: "100%", sm: "200px" },
  backgroundColor: "#fff",
  color: "#005AA6",
  border: "1px solid #005AA6",
  fontWeight: 700,
}));
const ApproveButton = styled(Button)(({ theme }) => ({
  height: "42px",
  backgroundColor: "#41af6e",
}));

const ButtonStack = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: { xs: "10px", sm: "20px" },
  width: "100%",
  marginBottom: "2%",
}));

const SaveNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#FFFF",
}));

const CancelNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#ED6A15",
}));

const CancelNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const StyledButton1 = styled(Button)(({ theme }) => ({
  width: "34px",
  height: "34px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #BDBDBD",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
  },
}));
const StyledButton2 = styled(Button)(({ theme }) => ({
  width: "34px",
  height: "34px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  marginTop: "2%",
  color: "#ED6A15",
  borderColor: "#ED6A15",
}));

const SaveNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: { xs: "12px", sm: "14px" },
  color: "#005AA6",
}));

const HeaderSubTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: { xs: "14px", sm: "16px" },
  color: "#121212DE",
}));

const ButtonGroupStack = styled(ToggleButtonGroup)(({ theme }) => ({
  mr: 1,
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
  },
  "& .MuiToggleButton-root.Mui-selected": {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.15)",
    },
  },
}));

const StyledCircularBox = styled(Box)(({ theme }) => ({
  width: "23px",
  height: "23px",
  borderRadius: "50px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
  justifyContent: "center",
  alignItems: "center",
}));

const StyledStack = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
}));
const HeaderStack = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  gap: { xs: "10px", sm: "0" },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const ModalTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: "14px",
  marginBottom: "3%",
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: { xs: "column", sm: "row" },
  justifyContent: "space-between",
  alignItems: { xs: "flex-start", sm: "center" },
  padding: { xs: "10px", sm: "0" },
}));

const NoteButtonStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  direction: "row",
  display: "flex",
  justifyContent: "center",
  marginTop: "4%",
}));

const RejectButtonStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  direction: "row",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "4%",
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: "#121212DE",
  fontWeight: "400",
  fontSize: "16px",
}));

const StyledDropdown = styled(Dropdown)(
  ({ readOnly, backgroundColor, theme }) => ({
    backgroundColor: backgroundColor || (readOnly ? "#F5F5F5" : "transparent"),
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  })
);

const dummyReviewData = [
  {
    day0: "2.00",
    day1: "2.00",
    day2: "2.00",
    day3: "2.00",
    day4: "2.00",
    day5: "0.00",
    day6: "0.00",
    isNote: true,
    weekTotal: "10.00",
    project: "JMA NOFO 2 O-RU",
    level: "Mechanical Design",
    title: "1.4.10.2.1",
    id: 1,
    hierarchy: ["JMA NOFO 2 O-RU", "Mechanical Design"],
  },
  {
    day0: "2.00",
    day1: "2.00",
    day2: "2.00",
    day3: "2.00",
    day4: "2.00",
    day5: "0.00",
    day6: "0.00",
    weekTotal: "10.00",
    project: "JMA NOFO 2 O-RU",
    title: "1.4.10.2.3",
    level: "PCB Design",
    id: 2,
    hierarchy: ["JMA NOFO 2 O-RU", "PCB Design"],
  },
  {
    day0: "2.00",
    day1: "2.00",
    day2: "2.00",
    day3: "2.00",
    day4: "2.00",
    day5: "0.00",
    day6: "0.00",
    weekTotal: "10.00",
    project: "Indirect",
    title: "1.1",
    level: "General Training",
    id: 3,
    hierarchy: ["Indirect", "General Training"],
  },
  {
    day0: "2.00",
    day1: "2.00",
    day2: "2.00",
    day3: "2.00",
    day4: "2.00",
    day5: "0.00",
    day6: "0.00",
    weekTotal: "10.00",
    project: "Indirect",
    title: "1.3",
    level: "PTO",
    id: 4,
    hierarchy: ["Indirect", "PTO"],
  },
  {
    day0: "8.00",
    day1: "8.00",
    day2: "8.00",
    day3: "8.00",
    day4: "8.00",
    day5: "0.00",
    day6: "0.00",
    weekTotal: "40.00",
    project: "Total",
    title: "",
    level: "Total",
    id: 5,
    hierarchy: ["Total"],
    totalRow: true,
    isParent: false,
  },
];

const ProjectData = [
  { id: 1, title: "Incorrect Time Entry" },
  { id: 2, title: "Incorrect Charge Code" },
  { id: 3, title: "Other" },
];

const rows = [
  { id: 1, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0 },
];

const ReviewScreen = () => {
  const { state } = useLocation();
  const { data } = state || {};
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const newRow = useSelector((state) => state?.CreateForm?.newRow);
  const [open, setOpen] = React.useState(false);
  const [openApproval, setOpenApproval] = React.useState(false);
  const [actionMsg, setActionMsg] = useState("");
  const [openRejection, setOpenRejection] = React.useState(false);
  const [isTimeSheetRejected, setTimesheetRejected] = useState(false);
  const [removeRejection, handleRemoveRejection] = useState();
  const [saveTimeClick, setSaveTimeClick] = useState(false);
  const [showRelese, setShowRelease] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const [openApiMsg, setOpenApiMsg] = useState(false);
  const [apiMsg, setApiMsg] = useState("");
  const [reviewColumns, setReviewColumns] = useState([]);

  const navigate = useNavigate();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const dispatch = useDispatch();
  const { isReviewer, pernr, start, stop, week } = useParams();
  const [selectedReason, setSelectedReason] = useState(""); // Add this new state
  // API methods
  const [
    getTimesheetEntry,
    {
      data: dateWiseData,
      isSuccess: dateWiseDataSuccessful,
      isFetching: timeSheetDataFetching,
      isError: isDateWiseDataError,
      error: dateWiseDataError,
    },
  ] = useLazyGetDateWiseDetailsQuery();
  const { data: userData } = useGetUserDataQuery();

  const [
    makeBatchCall,
    {
      isSuccess: batchCallIsSuccess,
      isLoading: batchCallLoading,
      error: batchCallIsError,
    },
  ] = useMakeApprovalBatchCallMutation();

  const [
    getReviewDetailData,
    {
      data: reviewDetailData,
      isSuccess: reviewDataIsSuccess,
      isFetching: reviewDataLoading,
      error: reviewDataIsError,
    },
  ] = useLazyGetReviewDetailDataQuery();

  const { data: rejectionReasons } = useGetRejectedReasonsQuery();

  useEffect(() => {
    if (week && pernr) {
      getReviewDetailData({ week, pernr });
    }
  }, [week, pernr]);

  const handleRejection = () => setOpenRejection(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleApprovalClose = () => setOpenRejection(false);

  const handleApproval = (type) => {
    if (type == "reject") {
      setActionMsg("Are you sure you want to reject this timesheet?");
    } else if (type == "release") {
      setActionMsg("Are you sure you want to release this timesheet?");
    } else if (type == "approve") {
      setActionMsg("Are you sure you want to approve this timesheet?");
    } else {
      setNewStatus("Pending for Approval");
    }
    setOpenApproval(true);
  };

  const handleYesPress = () => {
    setOpenApproval(false);

    if (actionMsg.indexOf("approve") >= 0) {
      handleApprove();
      // setSnackBarMsg("Timesheet Approved !!");
      // setShowRelease(true);
      // setNewStatus("Approved");
    } else if (actionMsg.indexOf("reject") >= 0) {
      setSnackBarMsg("Timesheet Reject !!");
      setNewStatus("Rejected");
      setShowRelease(true);
      setSnackbarOpen(true);
    } else {
      setSnackBarMsg("Timesheet Released !!");
      // setNewStatus("Release")
      setNewStatus("Pending for Approval");
      setSnackbarOpen(true);
    }
  };

  const handleReasonChange = (event, value) => {
    setSelectedReason({
      value: value.value,
      desc: value.label,
    });
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handlePreviousWeek = () => {
    let currentStartDate;

    if (!selectedDate || selectedDate.length === 0) {
      currentStartDate = dayjs().startOf("week").add(1, "day");
    } else {
      try {
        if (typeof selectedDate === "string") {
          const startDateStr = selectedDate.split(" - ")[0];
          currentStartDate = dayjs(startDateStr, "DD MMM YYYY");
        } else {
          currentStartDate = dayjs().startOf("week").add(1, "day");
        }
      } catch (error) {
        currentStartDate = dayjs().startOf("week").add(1, "day");
      }
    }
    const startOfPreviousWeek = currentStartDate.subtract(7, "day");
    const endOfPreviousWeek = startOfPreviousWeek.add(6, "day");
    const newDateRange = `${startOfPreviousWeek.format("DD MMM YYYY")} - ${endOfPreviousWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
  };

  const handleNextWeek = () => {
    let currentStartDate;
    if (!selectedDate || selectedDate.length === 0) {
      currentStartDate = dayjs().startOf("week").add(1, "day");
    } else {
      try {
        if (typeof selectedDate === "string") {
          const startDateStr = selectedDate.split(" - ")[0];
          currentStartDate = dayjs(startDateStr, "DD MMM YYYY");
        } else {
          currentStartDate = dayjs().startOf("week").add(1, "day");
        }
      } catch (error) {
        currentStartDate = dayjs().startOf("week").add(1, "day");
      }
    }
    const startOfNextWeek = currentStartDate.add(7, "day");
    const endOfNextWeek = startOfNextWeek.add(6, "day");
    const newDateRange = `${startOfNextWeek.format("DD MMM YYYY")} - ${endOfNextWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
  };

  const handleSubmit = () => {
    navigate("/addRows");
  };

  const handleApprove = async () => {
    const timesheetEntries = prepareApprovalPayload();
    const batchPayload = PrepareApprovalBatchPayload(timesheetEntries);
    const response = await makeBatchCall({ body: batchPayload });
    console.log("Approve response", response);
  };

  const handleReject = () => {};

  const handleInputChange = (field, value, rowId) => {
    let tempRows = [...rows];
    let tempRow = tempRows[rowId];
    tempRow = { ...tempRow, [field]: value };
    tempRows[rowId] = tempRow;
    // setRows(tempRows);
  };

  const handleDelete = (rowId) => {
    let tempRows = [...rows];
    tempRows.splice(rowId, 1);
    // setRows(tempRows)
    dispatch(setProjectData(tempRows));
    // updateCount(tempRows);
  };

  const handleRejected = (hasNote) => {
    if (hasNote && hasNote?.size !== 0) {
      setTimesheetRejected(true);
    } else {
      setTimesheetRejected(false);
    }
  };

  useEffect(() => {
    if (selectedDate && selectedDate?.length && selectedDate?.length > 0) {
      getTimesheetDataWeekWise();
    }
  }, [selectedDate, pernr]);

  useEffect(() => {
    if (start && stop) {
      // daterange from start and stop
      let startYear = parseInt(start.toString().substring(0, 4), 10);
      let startMonth = parseInt(start.toString().substring(4, 6), 10) - 1; // Month is zero-based in JS
      let startDay = parseInt(start.toString().substring(6, 8), 10);

      // Create a new date object
      let startDate = new Date(startYear, startMonth, startDay);

      let endYear = parseInt(stop.toString().substring(0, 4), 10);
      let endMonth = parseInt(stop.toString().substring(4, 6), 10) - 1; // Month is zero-based in JS
      let endDay = parseInt(stop.toString().substring(6, 8), 10);

      // Create a new date object
      let endDate = new Date(endYear, endMonth, endDay);

      // let startOfWeek = dayjs(startDate, "DD MMM YYYY");
      // Format the date as "DD MMM YYYY" (zero-padded day)
      let formattedSDay = startDay.toString().padStart(2, "0"); // Ensures two-digit day
      let formattedSMonth = startDate.toLocaleDateString("en-US", {
        month: "short",
      });

      let formattedEDay = endDay.toString().padStart(2, "0"); // Ensures two-digit day
      let formattedEMonth = endDate.toLocaleDateString("en-US", {
        month: "short",
      });

      let startofWeek = `${formattedSDay} ${formattedSMonth} ${startYear}`;
      let endOfWeek = `${formattedEDay} ${formattedEMonth} ${endYear}`;

      // let endOfWeek = dayjs(endDate, "DD MMM YYYY");
      const formattedDateRange = `${startofWeek} - ${endOfWeek}`;

      dispatch(setDateRange(formattedDateRange));
    }
  }, [start, stop]);

  useEffect(() => {
    if (dateWiseDataSuccessful && dateWiseData) {
      if (!newRow) {
        const responseData = dateWiseData;
        console.log("responsedata", responseData);
        let transformedData = transformToWeeklyRows(responseData);
        // const projectArray = transformedData.map((x) => x.project);
        // projectArray.forEach(project => {
        //   const
        // });
        transformedData = addTotalRow(transformedData);
        console.log("transformedData>>>>>>>", transformedData);
        // setProductTime(transformedData);
        dispatch(setProjectData(transformedData));
      }
    }

    if (isDateWiseDataError && dateWiseDataError) {
      setOpenApiMsg(true);
      setApiMsg(dateWiseDataError);
      let transformedData = transformToWeeklyRows([]);
      transformedData = addTotalRow(transformedData);
      dispatch(setProjectData(transformedData));
    }
  }, [timeSheetDataFetching]);

  useEffect(() => {
    if (batchCallIsSuccess) {
      if (actionMsg.indexOf("approve") >= 0) {
        setSnackBarMsg("Timesheet Approved !!");
        setShowRelease(true);
        setNewStatus("Approved");
      }
    }
  }, [batchCallLoading]);

  // useEffect(() => {
  //   if (selectedDate == "") {
  //     const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
  //     const currentWeekStart = startOfCurrentWeek.format("DD");
  //     const endOfCurrentWeek = dayjs().endOf("week").add(1, "day");
  //     const formattedDateRange = `${startOfCurrentWeek.format("DD MMM YYYY")} - ${endOfCurrentWeek.format("DD MMM YYYY")}`;
  //     dispatch(setDateRange(formattedDateRange));
  //   }
  // }, []);

  // const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
  // const endOfCurrentWeek = dayjs().endOf("week").add(1, "day");
  // const formattedDateRange = `${startOfCurrentWeek.format("DD MMM YYYY")} - ${endOfCurrentWeek.format("DD MMM YYYY")}`;

  const getTimesheetDataWeekWise = () => {
    if (selectedDate && selectedDate?.length && selectedDate?.length > 0) {
      const dates = selectedDate.split(" - ");
      const sDate = new Date(dates[0]);
      const eDate = new Date(dates[1]);
      const formattedStartDate = getODataFormatDate(sDate);
      const formattedEndDate = getODataFormatDate(eDate);
      getTimesheetEntry({
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        pernr: pernr,
        // pernr: userData?.results[0].EmployeeNumber,
      });
    }
  };

  const addTotalRow = (transformedData) => {
    let totalsRow = {
      day0: 0,
      day1: 0,
      day2: 0,
      day3: 0,
      day4: 0,
      day5: 0,
      day6: 0,
      weekTotal: 0,
      project: "",
      level: "Total",
      title: "",
      id: Math.random(),
      totalRow: true,
      hierarchy: ["Total"],
    };

    let data = [...transformedData];
    data.forEach((item) => {
      for (let i = 0; i <= 6; i++) {
        totalsRow[`day${i}`] += parseFloat(item[`day${i}`] || "0");
      }
      totalsRow.weekTotal += parseFloat(item.weekTotal || "0");
    });

    // Convert totals to string format with 2 decimal places
    for (let i = 0; i <= 6; i++) {
      totalsRow[`day${i}`] = totalsRow[`day${i}`].toFixed(2);
    }
    totalsRow.weekTotal = totalsRow.weekTotal.toFixed(2);

    // check for enable the button
    checkForTotalHours(totalsRow);
    // Add total row to the data array
    data.push(totalsRow);
    return data;
  };

  const checkForTotalHours = (totalRowObj) => {
    if (
      totalRowObj &&
      totalRowObj?.weekTotal &&
      parseFloat(totalRowObj?.weekTotal) >= 40
    ) {
      setSaveTimeClick(true);
    } else {
      setSaveTimeClick(false);
    }
  };

  const transformToWeeklyRows = (response) => {
    const results = response?.results; // Extract the top-level results array
    const weekRows = []; // Array to store the transformed weekly data
    let weeklyStatus = {
      Rejected: 0,
      Approved: 0,
      Draft: 0,
      SubmitForApproval: 0,
    };
    // results.forEach((dayData, dayIndex) => {
    // here i is consider as row data
    for (let i = 0; i < results?.length; i++) {
      let dayData = results[i];
      const timeEntries = dayData.TimeEntries.results;
      // here j is consider as day number
      for (let j = 0; j < timeEntries?.length; j++) {
        let entry = timeEntries[j];
        // const workDate = new Date(
        //   parseInt(entry.TimeEntryDataFields.WORKDATE.match(/\d+/)[j], 10)
        // );
        // const dayOfWeek = workDate.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)
        const hours = parseFloat(entry.TimeEntryDataFields.CATSHOURS || "0");
        const dayKey = `day${i}`;
        let weekRow;
        let rowIndex;
        let rowExist = weekRows.filter(
          (x) => x.level === entry?.TimeEntryDataFields?.POSID
        );
        if (rowExist && rowExist.length && rowExist.length > 0) {
          weekRow = rowExist[0];
          rowIndex = weekRows.indexOf(weekRow);
        } else {
          weekRow = weekRows[j];
          rowIndex = j;
        }
        // Update the hours for the correct day of the week
        if (!weekRow) {
          weekRow = {
            weekTotal: "0.00",
            project: entry?.TimeEntryDataFields?.PSPID_DESC,
            level: entry?.TimeEntryDataFields?.POSID,
            title: entry?.TimeEntryDataFields?.POST1,
            id: Math.random(),
            hierarchy: [
              entry?.TimeEntryDataFields?.PSPID_DESC,
              entry?.TimeEntryDataFields?.POST1,
            ],
            day0: "0.00",
            day1: "0.00",
            day2: "0.00",
            day3: "0.00",
            day4: "0.00",
            day5: "0.00",
            day6: "0.00",
          };
          weekRow = {
            ...weekRow,
            [dayKey]: hours.toFixed(2),
            [`${dayKey}Counter`]: entry?.Counter,
            [`${dayKey}timeEntryOperation`]: "U",
            [`${dayKey}AllowRelease`]: entry?.AllowRelease,
            [`${dayKey}STATUS`]: entry?.Status,
            [`${dayKey}Notes`]: entry?.TimeEntryDataFields?.LONGTEXT_DATA,
            [`${dayKey}RecRowNo`]: entry?.RecRowNo,
            [`${dayKey}WORKDATE`]: entry?.TimeEntryDataFields?.WORKDATE,
            [`${dayKey}DateCreate`]: entry?.TimeEntryDataFields?.LAEDA,
            [`${dayKey}TimeCreate`]: entry?.TimeEntryDataFields?.LAETM,
          };
        } else {
          weekRow[dayKey] = hours.toFixed(2);
          weekRow[`${dayKey}Counter`] = entry?.Counter;
          weekRow[`${dayKey}timeEntryOperation`] = "U";
          weekRow[`${dayKey}AllowRelease`] = entry?.AllowRelease;
          weekRow[`${dayKey}STATUS`] = entry?.Status;
          weekRow[`${dayKey}Notes`] = entry?.TimeEntryDataFields?.LONGTEXT_DATA;
          weekRow[`${dayKey}RecRowNo`] = entry?.RecRowNo;
          weekRow[`${dayKey}WORKDATE`] = entry?.TimeEntryDataFields?.WORKDATE;
          weekRow[`${dayKey}DateCreate`] = entry?.TimeEntryDataFields?.ERSDA;
          weekRow[`${dayKey}TimeCreate`] = entry?.TimeEntryDataFields?.ERSTM;
        }
        weekRows[rowIndex] = weekRow;
        // all status check
        if (entry?.Status === "40") {
          weeklyStatus.Rejected = weeklyStatus.Rejected + 1;
        } else if (entry?.Status === "30") {
          weeklyStatus.Approved = weeklyStatus.Approved + 1;
        } else if (entry?.Status === "20") {
          weeklyStatus.SubmitForApproval = weeklyStatus.SubmitForApproval + 1;
        } else {
          weeklyStatus.Draft = weeklyStatus.Draft + 1;
        }
      }
    }
    // Calculate total hours for each week row
    weekRows.forEach((weekRow) => {
      weekRow.weekTotal = (
        parseFloat(weekRow.day0) +
        parseFloat(weekRow.day1) +
        parseFloat(weekRow.day2) +
        parseFloat(weekRow.day3) +
        parseFloat(weekRow.day4) +
        parseFloat(weekRow.day5) +
        parseFloat(weekRow.day6)
      ).toFixed(2);
    });

    // overall status check
    if (weeklyStatus.Rejected > 0) {
      dispatch(setStatus("Rejected"));
    } else if (weeklyStatus.Approved > 0) {
      dispatch(setStatus("Approved"));
    } else if (weeklyStatus.SubmitForApproval > 0) {
      dispatch(setStatus("Pending For Approval"));
    } else if (weeklyStatus.Draft > 0) {
      dispatch(setStatus("Draft"));
    } else {
      dispatch(setStatus("New"));
    }
    return weekRows;
  };

  const prepareApprovalPayload = (type) => {
    const timesheetEntries = projectedData.filter(
      (item) => item?.totalRow !== true
    );
    let entries = [];
    timesheetEntries.forEach((entry) => {
      let startDate = new Date();
      if (selectedDate && selectedDate.length && selectedDate.length > 0) {
        const dates = selectedDate.split(" - ");
        startDate = dates[0];
      } else {
        startDate = getWeekStartDate();
      }

      for (let i = 0; i < 7; i++) {
        const currentDate = dayjs(startDate).add(i, "day");
        const payloadDate = getODataFormatDate(currentDate.$d);
        const createDate = entry[`day${i}DateCreate`];
        const dateCreate = createDate ? odataGetDateFormat(createDate) : "";
        if (entry[`day${i}`] && parseFloat(entry[`day${i}`]) > 0) {
          const temp = {
            EmployeeID: userData?.results[0].EmployeeNumber,
            Counter: entry[`day${i}Counter`] || "",
            Status: "30",
            Reason: "",
            DateCreate: dateCreate,
            TimeCreate: entry[`day${i}TimeCreate`],
            __metadata: {
              type: "HCMFAB_APR_TIMESHEET_SRV.ApprovalDetails",
            },
          };
          entries.push(temp);
        }
      }
    });
    return entries;
  };

  return (
    <>
      <StyledStack
        padding={{ xs: 1, sm: 1 }}
        // height={{ xs: "auto", sm: "90vh", md: "90vh", lg: "90vh" }}
        paddingX={{ xs: 2, sm: 10 }}
      >
        <HeaderBox
          sx={{
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Button
            sx={{
              marginBottom: { xs: 2, sm: 3 },
              padding: { xs: 1, sm: 1.5 },
            }}
            startIcon={<ArrowBackIosNewIcon sx={{ color: "#0073E6" }} />}
            onClick={() => navigate(-1)}
          >
            <StyledTypography>Back</StyledTypography>
          </Button>
          {/* <Button
            sx={{
              marginBottom: { xs: 2, sm: 3 },
              padding: { xs: 1, sm: 1.5 },
            }}
            endIcon={<ArrowForwardIosIcon sx={{ color: "#0073E6" }} />}
            onClick={() => navigate(-1)}
          >
            <StyledTypography>NEXT</StyledTypography>
          </Button> */}
          {/* <ArrowBackIosNew
                    sx={{
                        color: "#005AA6",
                        mb: { xs: 2, sm: 0 },
                        mr: { sm: 2 }
                    }}
                    onClick={() => navigate(-1)

                    }
                /> */}
          <HeaderStack
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              justifyContent: "flex-end",
              gap: { xs: 2, sm: 0 },
            }}
          >
            <Stack
              sx={{
                padding: { xs: 1, sm: 3 },
                paddingRight: { xs: 1, sm: 10 },
                alignItems: { xs: "flex-start", sm: "inherit" },
              }}
            >
              <HeaderTypography>Employee Name</HeaderTypography>
              <HeaderSubTypography>
                {reviewDetailData?.results[0]?.EName}
              </HeaderSubTypography>
            </Stack>
            <Stack
              sx={{
                padding: { xs: 1, sm: 3 },
                paddingRight: { xs: 1, sm: 10 },
                alignItems: { xs: "flex-start", sm: "inherit" },
              }}
            >
              <HeaderTypography>Employee ID</HeaderTypography>
              <HeaderSubTypography>
                {reviewDetailData?.results[0]?.Pernr}
              </HeaderSubTypography>
            </Stack>
            <Stack
              sx={{
                padding: { xs: 1, sm: 3 },
                paddingRight: { xs: 1, sm: 10 },
                alignItems: { xs: "flex-start", sm: "inherit" },
              }}
            >
              <HeaderTypography>Status</HeaderTypography>
              <HeaderSubTypography
                style={{
                  color: StatusColorFormatter(
                    reviewDetailData?.results[0]?.STATUS
                  ),
                }}
              >
                {StatusCaseFormatting(
                  StatusTextFormatting(reviewDetailData?.results[0]?.STATUS)
                )}
              </HeaderSubTypography>
            </Stack>
          </HeaderStack>
        </HeaderBox>
        <Divider sx={{ marginBottom: "2%" }} />
        <StyledBox>
          <MainBox>
            <SubBox
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { xs: "flex-start", sm: "center" },
                gap: { xs: "10px", sm: "0" },
              }}
            >
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
              >
                <ToggleButton
                  value="left"
                  aria-label="left aligned"
                  onClick={() => handlePreviousWeek()}
                >
                  <ArrowBackIcon />
                </ToggleButton>
                <ToggleButton
                  value="justify"
                  aria-label="justified"
                  onClick={() => handleNextWeek()}
                >
                  <ArrowForwardIcon />
                </ToggleButton>
              </ToggleButtonGroup>

              <StyledDateTypography>{selectedDate}</StyledDateTypography>
              <DateRangePickerWithButtonField
                label={
                  value[0] === null && value[1] === null
                    ? null
                    : value
                        .map((date) =>
                          date ? date.format("MM/DD/YYYY") : "null"
                        )
                        .join(" - ")
                }
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </SubBox>
            {/* <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                        <StyledButton2 size="small" variant="outlined" boxShadow="5" onClick={handleOpen}>
                            <EditIcon fontSize="small" backgroundColor="#FFFF" sx={{ color: "#ED6A15" }} />
                        </StyledButton2>
                        <StyledButton2 size="small" variant="outlined" onClick={handleSubmit}>
                            <StyledCircularBox>
                                <AddIcon fontSize="small" color="#FFFF" sx={{ color: "#FFFF" }} />
                            </StyledCircularBox>
                        </StyledButton2>
                    </Box> */}
          </MainBox>
        </StyledBox>
        <Stack
          mt={2}
          mb={4}
          sx={{
            width: "100%",
            overflowX: { xs: "auto", sm: "visible" },
          }}
        >
          <TreeGrid
            columns={ReviewColumns({
              rows,
              selectedDate,
              handleInputChange,
              handleDelete,
              isParent: false,
              handleRejected,
            })}
            density={"standard"}
            data={projectedData}
            sx={{
              minWidth: { xs: "800px", sm: "100%" },
            }}
          />
        </Stack>
        {isReviewer == "true" ? (
          <ButtonStack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-start",
              alignItems: { xs: "stretch", sm: "flex-start" },
              gap: { xs: "10px", sm: "20px" },
              width: "100%",
              marginTop: "1%",
              marginBottom: "5%",
            }}
          >
            <RejectButton
              disabled={!isTimeSheetRejected}
              variant="contained"
              color="#DD133F"
              backgroundColor="#DD133F"
              sx={{
                width: { xs: "100%", sm: "200px" },
                backgroundColor: "#DD133F",
                color: "#fff",
              }}
              onClick={() => handleApproval("reject")}
            >
              Reject
            </RejectButton>
            <ApproveButton
              disabled={isTimeSheetRejected}
              variant="contained"
              color="success"
              sx={{ width: { xs: "100%", sm: "200px" } }}
              onClick={() => handleApproval("approve")}
            >
              Approve
            </ApproveButton>
          </ButtonStack>
        ) : (
          <></>
        )}
      </StyledStack>
      <Modal
        keepMounted
        open={openRejection}
        // onClose={handleApprovalClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: "#121212",
            opacity: "80%",
          },
        }}
      >
        <RejectionBox>
          <RejectionMainBox>
            <ModalTypography>Rejection Reasons</ModalTypography>
            <StyledDropdown
              name="project"
              options={rejectionReasons?.results.map((option) => ({
                label: option?.Text,
                value: option?.Reason,
              }))}
              onChange={handleReasonChange}
              value={selectedReason?.desc || "--"}
            />
          </RejectionMainBox>

          {selectedReason === "Other" && (
            <MuiInput
              rows={2}
              multiline={true}
              placeholder="Please specify the reason"
              sx={{ marginTop: "20px" }}
            />
          )}
          <RejectButtonStack direction="row" spacing={3}>
            <CancelNoteButton
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              size="small"
              onClick={() => handleApprovalClose()}
            >
              <CancelNoteTypography>Cancel</CancelNoteTypography>
            </CancelNoteButton>
            <SaveNoteButton
              id="keep-mounted-modal-description"
              sx={{ mt: 2 }}
              size="small"
              onClick={() => handleApprovalClose()}
            >
              <SaveNoteTypography>Submit</SaveNoteTypography>
            </SaveNoteButton>
          </RejectButtonStack>
        </RejectionBox>
      </Modal>
      <Modal
        keepMounted
        open={openApproval}
        // onClose={handleApprovalClose}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: "#121212",
            opacity: "80%",
          },
        }}
      >
        <ApprovalBox>
          <StyledIconButton onClick={() => setOpenApproval(false)}>
            <CloseIcon />
          </StyledIconButton>

          <DescriptionTypography>{actionMsg}</DescriptionTypography>
          <NoteButtonStack direction="row" spacing={3}>
            <CancelNoteButton
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              size="small"
              onClick={() => setOpenApproval(false)}
            >
              <CancelNoteTypography>No</CancelNoteTypography>
            </CancelNoteButton>
            <SaveNoteButton
              id="keep-mounted-modal-description"
              sx={{ mt: 2 }}
              size="small"
              onClick={handleYesPress}
            >
              <SaveNoteTypography>Yes</SaveNoteTypography>
            </SaveNoteButton>
          </NoteButtonStack>
        </ApprovalBox>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={
            snackBarMsg.indexOf("Approved") >= 0
              ? "success"
              : snackBarMsg.indexOf("Reject") >= 0
                ? "error"
                : "success"
          }
          sx={{ width: "100%" }}
        >
          {snackBarMsg}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openApiMsg}
        autoHideDuration={3000}
        onClose={() => setOpenApiMsg(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenApiMsg(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {apiMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewScreen;
