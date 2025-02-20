import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Alert,
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Fade,
  Grid2,
  Modal,
  Popper,
  Snackbar,
  Stack,
  ToggleButton,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MuiDataGrid from "../../components/MuiDataGrid";
import { getCurrentWeekDays, PRColumns } from "../../constant/Columns";
import DateRangePickerWithButtonField from "../../components/DateRangeButtonFeild";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DaysColumns } from "components/CurrentWeekColumns";
import { RowsDataColumns } from "components/RowsDataColumn";
import TreeGrid from "components/TreeGrid";
import MuiInput from "components/MuiInput";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import { setDateRange } from "store/slice/HomeSlice";
import { Footer } from "components/Footer";
import {
  deleteProjectDataById,
  setApprovalCount,
  setNewRowAdded,
  setProjectData,
  setStatus,
  setTotal,
  updateRow,
  updateRowTotal,
} from "store/slice/TimesheetSlice";
import { ReviewColumns } from "components/ReviewColumns";
import {
  getODataFormatDate,
  getWeekStartDate,
  PrepareBatchPayload,
  StatusCaseFormatting,
  StatusColorFormatter,
} from "utils/AppUtil";
import {
  useGetUserDataQuery,
  useLazyGetDateWiseDetailsQuery,
  useMakeBatchCallMutation,
} from "api/timesheetApi";
import BusyDialog from "components/BusyLoader";
import { useGetDateWiseDetailsQuery } from "api/timesheetDashboardApi";
import Search from "components/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "#FBE1D0",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const ApprovalBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "30%",
  // height: "300px",
  position: "relative",
  flexDirection: "column",
  padding: "20px",
}));

const SubModalstyle = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "320px",
  height: "300px",
  position: "relative",
  flexDirection: "column",
  padding: "20px",
}));

const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  lineHeight: "26px",
  fontWeight: "500",
  padding: "0 8px",
  borderRadius: "4px",
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: { xs: "12px", sm: "14px" },
  color: "#121212DE",
}));

const HeaderSubTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  fontSize: { xs: "14px", sm: "16px" },
  color: "#121212DE",
}));

const SaveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#FFFF",
}));
const SaveNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#FFFF",
}));

const CancelTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#ED6A15",
}));
const CancelNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "600",
  color: "#ED6A15",
}));

const StyledStackButton = styled(Stack)(({ theme }) => ({
  direction: "row",
  height: "34px",
}));

const ButtonStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "4%",
}));

const NoteButtonStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  display: "flex",
  // justifyContent: "flex-start",
  // alignItems: "center",
  marginTop: "8%",
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
  width: "100px",
  height: "45px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));
const SaveNoteButton = styled(Button)(({ theme }) => ({
  width: "54px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));

const CancelButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "45px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const CancelNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const FooterButton = styled(Button)(({ theme }) => ({
  width: "100%",
}));

const SaveTimeButton = styled(Button)(({ theme }) => ({
  border: "1px solid #ED6A15",
  marginBottom: "0.5rem",
}));

const StyledFooterText = styled(Typography)(({ theme }) => ({
  color: "#FFFF",
  fontWeight: "700",
  fontSize: "14px",
}));

const StyledSaveStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column", // Default for small screens
  alignItems: "flex-start", // Adjust alignment for small screens
  gap: "10px", // Add spacing between children
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Horizontal layout for larger screens
    alignItems: "center",
    gap: "20px",
  },
}));

const StyledSavedTimeText = styled(Typography)(({ theme }) => ({
  color: "#ED6A15",
  fontWeight: "700",
  fontSize: "14px", // Smaller text for small screens
}));

const ModalTypography = styled(Typography)(({ theme }) => ({
  color: "#121212DE",
  fontWeight: "700",
  fontSize: "16px",
}));

const AcknowledgeTypography = styled(Typography)(({ theme }) => ({
  color: "#DD133F",
  fontWeight: "700",
  fontSize: "16px",
}));

const TimesheetText = styled(Typography)(({ theme }) => ({
  color: "#41AF6E",
  fontWeight: "700",
  fontSize: "16px",
}));
const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: "#121212DE",
  fontWeight: "400",
  fontSize: "16px",
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: "-10px",
  top: "-30px",
  zIndex: 1,
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  mr: 1,
  boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
  transition: "box-shadow 0.3s ease-in-out",

  "&:hover": {
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiToggleButton-root.Mui-selected": {
    backgroundColor: "white",
    "&:hover": {
      // backgroundColor: "#FFFFFF",
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
    },
    // boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
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

const FooterBox = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  display: "flex",
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: "#ffffff",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  boxSizing: "border-box",

  // Container layout
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  // Spacing and margins
  gap: theme.spacing(2),
  marginTop: "auto",

  // Height adjustments
  minHeight: {
    xs: "auto",
    sm: "80px",
    md: "70px",
  },

  // Inner content layout
  "& .footer-content": {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),

    [theme.breakpoints.up("md")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },

  // Save time section
  "& .save-time-section": {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),

    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },

  // Button sizes
  "& .save-time-button": {
    width: {
      xs: "100%",
      sm: "auto",
    },
    minWidth: {
      sm: "150px",
    },
  },

  "& .submit-button": {
    width: {
      xs: "100%",
      md: "auto",
    },
    minWidth: {
      md: "200px",
    },
  },

  // Last saved text
  "& .last-saved": {
    fontSize: {
      xs: "12px",
      sm: "14px",
    },
    textAlign: {
      xs: "center",
      sm: "left",
    },
    marginTop: {
      xs: theme.spacing(1),
      sm: 0,
    },
    whiteSpace: "nowrap",
  },

  // Padding adjustments
  paddingLeft: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
  },
  paddingRight: {
    xs: theme.spacing(2),
    sm: theme.spacing(3),
    md: theme.spacing(4),
  },
}));

const StyledApprovalBox = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  maxWidth: "500px",
  boxShadow: 3,
}));

// const StyledApprovalIconButton = styled(IconButton)(({ theme }) => ({
//   position: "absolute",
//   // top: "-36px",
//   right: "0px",
//   color: "white",
// }));

const StyledStack = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  borderColor: "#ED6A15",
  color: "#ED6A15",
  marginTop: "4%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "5%",
}));

const Home = () => {
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const [allTimeData, setAllTimeData] = useState();
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const status = useSelector((state) => state?.CreateForm?.status);
  const newRow = useSelector((state) => state?.CreateForm?.newRow);
  const approvalCount = useSelector(
    (state) => state?.CreateForm?.approvalCount
  );

  const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
  const currentWeekStart = startOfCurrentWeek.format("DD");

  const [open, setOpen] = React.useState(false);
  const [approvalMsg, setApprovalMsg] = useState();
  const [openApproval, setOpenApproval] = React.useState(false);
  const [saveTimeClick, setSaveTimeClick] = useState(false);
  const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [isTimeSheetRejected, setTimesheetRejected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
  const [productTime, setProductTime] = useState([]);
  const [disableToggel, setDisableToggel] = useState(false);
  const location = useLocation();
  const formattedDefaultRange = location.state?.week || "Default Week Range";
  const handleOpen = () => setOpen(true);
  const [batchCallType, setBatchCallType] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleApprovalClose = () => setOpenApproval(false);
  const navigate = useNavigate();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);

  const [
    makeBatchCall,
    {
      isSuccess: batchCallIsSuccess,
      isLoading: batchCallLoading,
      error: batchCallIsError,
    },
  ] = useMakeBatchCallMutation();
  // this is service call to get Timesheet data for selected week
  const [
    getTimesheetEntry,
    {
      data: dateWiseData,
      isSuccess: dateWiseDataSuccessful,
      isFetching: timeSheetDataFetching,
    },
  ] = useLazyGetDateWiseDetailsQuery();

  const { data: userData } = useGetUserDataQuery();

  useEffect(() => {
    if (batchCallIsSuccess) {
      if (batchCallType == "approve") {
        setIsTimesheetCreated(true);
      } else if (batchCallType == "save") {
        setSnackbarOpen(true);
      } else {
        setDeleteMsgOpen(true);
      }
      dispatch(setNewRowAdded(false));
      getTimesheetDataWeekWise();
    }
  }, [batchCallLoading]);

  useEffect(() => {
    setFilteredData(projectedData);
  }, [projectedData]);

  // console.log("filteredData", filteredData)
  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filtered = projectedData?.filter(
        (item) =>
          item?.level?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          item?.project?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
      // console.log("filtered>>>>>>>>>>>>>", filtered);
      setFilteredData(filtered);
    } else {
      setFilteredData(projectedData);
    }
  };

  // console.log("allTimeData", allTimeData)

  const ProductArray = [];

  // // Convert allTimeData to an array if it's not already
  // const allTimeDataArray = Array.isArray(allTimeData) ? allTimeData : Array.from(allTimeData || []);

  // allTimeDataArray.map((productTimeData) => {

  //   console.log("productTimeData", productTimeData)
  //   ProductArray.push({
  //     day0: productTimeData?.TimeEntryDataFields,
  //     day1: productTimeData?.TimeEntryDataFields,
  //     day2: productTimeData?.TimeEntryDataFields,
  //     day3: productTimeData?.TimeEntryDataFields,
  //     day4: productTimeData?.TimeEntryDataFields,
  //     day5: productTimeData?.TimeEntryDataFields,
  //     day6: productTimeData?.TimeEntryDataFields,
  //     isReject: true,
  //     weekTotal: productTimeData?.TimeEntryDataFields,
  //     project: productTimeData?.AENAM,
  //     level: productTimeData?.AENAM,
  //     title: productTimeData?.AENAM,
  //     id: 1,
  //     hierarchy: [productTimeData?.AENAM, productTimeData?.AENAM],
  //   });
  // });

  //---------------------for showing different  modals on approvals----------------------------------------------
  const handleApproval = () => {
    if (status !== "New" && status !== "Draft") {
      setApprovalMsg(
        "I certify that the time recorded is correct and is entered in accordance with the company’s applicable Principles and Operating Practices for Time Collection and Labor Reporting and for Unallowable Activities. I understand and acknowledge that if I made adjustments to my timesheet for a prior pay period for which I have already been compensated, JMA will recover any overpayments from the next available paycheck/s and I hereby authorize such deductions to satisfy the overpayment."
      );
    } else {
      setApprovalMsg(
        "By signing this timesheet, you are certifying that hours were incurred on the charge and day specified in accordance with company policies and procedures."
      );
    }
    setOpenApproval(true);
    if (approvalCount > 0) {
      // dispatch(setStatus("Pending for approval"));
    }
  };

  const handlePrevWeekApproval = (approvalCount) => {
    if (approvalCount == 0) {
      if (!isCurrentWeek) {
        setApprovalMsg(
          "I certify that the time recorded is correct and is entered in accordance with the company’s applicable Principles and Operating Practices for Time Collection and Labor Reporting and for Unallowable Activities. I understand and acknowledge that if I made adjustments to my timesheet for a prior pay period for which I have already been compensated, JMA will recover any overpayments from the next available paycheck/s and I hereby authorize such deductions to satisfy the overpayment."
        );
      } else {
        setApprovalMsg(
          "By signing this timesheet, you are certifying that hours were incurred on the charge and day specified in accordance with company policies and procedures."
        );
      }
    } else {
      setApprovalMsg(
        "I certify that the time recorded is correct and is entered in accordance with the company’s applicable Principles and Operating Practices for Time Collection and Labor Reporting and for Unallowable Activities. I understand and acknowledge that if I made adjustments to my timesheet for a prior pay period for which I have already been compensated, JMA will recover any overpayments from the next available paycheck/s and I hereby authorize such deductions to satisfy the overpayment."
      );
    }
    setOpenApproval(true);
    // if (approvalCount >= 0) {
    //   dispatch(setStatus("Pending for approval"))
    // }
  };

  const handelSaveNote = () => {
    setOpenApproval(false);

    let aCount = approvalCount + 1;
    dispatch(setApprovalCount(aCount));
    if (approvalCount >= 0) {
      // dispatch(setStatus("Pending for approval"));
    }
    handleSaveTime("approve");
  };

  console.log(" projectedData>>>>", projectedData);

  const formatDateTime = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = String(date.getDate()).padStart(2, "0");
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;

    return `${day}-${month}-${year} at ${formattedHours}:${minutes}${ampm}`;
  };

  //-------------------for checking whether the date is greater than the current date----------------------

  const isSelectedDateGreaterThanCurrent = () => {
    // Return false if selectedDate is null, undefined, or not a string
    if (!selectedDate || typeof selectedDate !== "string") return false;
    try {
      const selectedStartDate = dayjs(
        selectedDate.split(" - ")[0],
        "DD MMM YYYY"
      );
      const formattedStartDate = dayjs(
        selectedDate.split(" - ")[0],
        "DD MMM YYYY"
      );

      if (!selectedStartDate.isValid() || !formattedStartDate.isValid()) {
        return false;
      }

      return selectedStartDate.isAfter(formattedStartDate);
    } catch (error) {
      console.error("Error parsing dates:", error);
      return false;
    }
  };

  //----------------function for handelling the previous week toggle buttons here ---------------------------
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
    const prevWeekStart = startOfPreviousWeek.format("DD");
    const endOfPreviousWeek = startOfPreviousWeek.add(6, "day");
    const newDateRange = `${startOfPreviousWeek.format("DD MMM YYYY")} - ${endOfPreviousWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
    // dispatch(setStatus("Rejected"));

    if (prevWeekStart == currentWeekStart) {
      setIsCurrentWeek(true);
      // dispatch(setStatus("New"));
      if (approvalCount > 0) {
        // dispatch(setStatus("Pending for approval"));
      }
    } else {
      setIsCurrentWeek(false);
    }
    dispatch(setNewRowAdded(false));
  };

  //----------------function for handelling the next week toggle buttons here ---------------------------

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
    const today = dayjs(); // Get the current date

    // Validation: Prevent selecting a future week beyond the current date
    if (startOfNextWeek.isAfter(today)) {
      setAlertOpen(true);
      return;
    }

    const newDateRange = `${startOfNextWeek.format("DD MMM YYYY")} - ${endOfNextWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
    // dispatch(setStatus("Rejected"));
    if (startOfNextWeek.isSame(currentStartDate, "day")) {
      setDisableToggel(true);
      setIsCurrentWeek(true);
    } else {
      setIsCurrentWeek(false);
    }
    dispatch(setNewRowAdded(false));
  };

  useEffect(() => {
    if (selectedDate == "") {
      const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
      const currentWeekStart = startOfCurrentWeek.format("DD");
      const endOfCurrentWeek = dayjs().endOf("week").add(1, "day");
      const formattedDateRange = `${startOfCurrentWeek.format("DD MMM YYYY")} - ${endOfCurrentWeek.format("DD MMM YYYY")}`;
      dispatch(setDateRange(formattedDateRange));
    }
  }, []);

  const prepareTimesheetPayload = (type) => {
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
        if (entry[`day${i}`] && parseFloat(entry[`day${i}`]) > 0) {
          const temp = {
            __metadata: {
              type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
            },
            TimeEntryDataFields: {
              __metadata: {
                type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
              },
              CATSHOURS: entry[`day${i}`],
              PERNR: userData?.results[0].EmployeeNumber,
              CATSQUANTITY: entry[`day${i}`],
              LTXA1: entry[`day${i}Notes`]?.substring(0, 40),
              LONGTEXT: entry[`day${i}Notes`] ? "X" : "",
              MEINH: "H",
              UNIT: "H",
              WORKDATE: payloadDate,
              LONGTEXT_DATA: entry[`day${i}Notes`],
              POSID: entry?.level,
            },
            Pernr: userData?.results[0].EmployeeNumber,
            TimeEntryOperation: entry[`day${i}timeEntryOperation`] || "C",
            Counter: entry[`day${i}Counter`] || "",
            AllowRelease: type === "approve" ? "X" : "",
            RecRowNo: (entries.length + 1).toString(),
          };
          entries.push(temp);
        }
      }
    });
    return entries;
  };

  const prepareDeleteEntryPayload = (rowId) => {
    const entry = projectedData.find((item) => item?.id == rowId);
    let entries = [];
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
      if (
        entry[`day${i}`] &&
        (parseFloat(entry[`day${i}`]) > 0 ||
          (entry[`day${i}Counter`] &&
            parseFloat(entry[`day${i}Counter`]) !== ""))
      ) {
        const temp = {
          __metadata: {
            type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
          },
          TimeEntryDataFields: {
            __metadata: {
              type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
            },
            CATSHOURS: entry[`day${i}`],
            PERNR: userData?.results[0].EmployeeNumber,
            CATSQUANTITY: entry[`day${i}`],
            LTXA1: "",
            MEINH: "H",
            UNIT: "H",
            WORKDATE: payloadDate,
            LONGTEXT_DATA: "",
            POSID: entry?.level,
          },
          Pernr: userData?.results[0].EmployeeNumber,
          TimeEntryOperation: "D",
          Counter: entry[`day${i}Counter`] || "",
          Status: entry[`day${i}STATUS`],
          AllowRelease: "",
          RecRowNo: parseFloat(i + 1).toString(),
        };
        entries.push(temp);
      }
    }

    return entries;
  };

  const handleSaveTime = async (type) => {
    const currentTime = new Date();
    setLastSavedTime(currentTime);
    // setSnackbarOpen(true);
    setBatchCallType(type);
    // make a batch call with payload
    const timesheetEntries = prepareTimesheetPayload(type);
    const batchPayload = PrepareBatchPayload(timesheetEntries);
    const response = await makeBatchCall({ body: batchPayload });
    console.log("response", response);
  };

  const handleYes = () => {
    setOpen(false);
    setSaveTimeClick(false);
    // setIsTimesheetCreated(true);
  };

  const handleTimesheetModalClose = () => setIsTimesheetCreated(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const rows = [
    {
      id: 1,
      day0: "0.00",
      day1: "0.00",
      day2: "0.00",
      day3: "0.00",
      day4: "0.00",
      day5: "0.00",
      day6: "0.00",
      day7: "0.00",
    },
  ];

  //----------------function for handelling the change in input  ---------------------------

  const handleInputChange = (field, value, rowId) => {
    const rows = [...projectedData];
    let rowObj = rows.find((item) => item.id === rowId);
    const rowIndex = rows.indexOf(rowObj);
    // Convert input value to a number
    let parsedValue = parseFloat(value || 0);
    // do the sum of the row
    let rowSum = 0;
    for (let i = 0; i < 7; i++) {
      if (`day${i}` !== field) {
        rowSum = rowSum + parseFloat(rowObj[`day${i}`] || 0);
      } else {
        rowSum = rowSum + parsedValue;
        rowObj = { ...rowObj, [field]: parsedValue.toFixed(2) };
      }
    }
    rowObj = { ...rowObj, weekTotal: parseFloat(rowSum).toFixed(2) };

    // Dispatch the update for this specific row and field
    dispatch(
      updateRow({
        rowIndex,
        rowObj,
      })
    );
    updateTotalRow(field, rowIndex, rowObj);
  };

  //----------------function for handelling the updation of total rows  ---------------------------

  const updateTotalRow = (field, rowIndex, rowObj) => {
    const rows = [...projectedData];
    const dataRows = rows.filter(
      (x) => x.totalRow !== true && x.id !== rowObj.id
    );
    const dayColumn = dataRows.map((item) => item[field]);
    let dayTotal = dayColumn.reduce(
      (a, c) => parseFloat(a || 0) + parseFloat(c || 0),
      0
    );
    dayTotal = parseFloat(dayTotal) + parseFloat(rowObj[field]);
    const totalRow = rows.find((x) => x.totalRow === true);
    let totalRowObj = {
      ...totalRow,
    };
    const totalRowIndex = rows.indexOf(totalRow);
    let rowSum = 0;
    for (let i = 0; i < 7; i++) {
      if (`day${i}` !== field) {
        rowSum = rowSum + parseFloat(totalRowObj[`day${i}`] || 0);
      } else {
        rowSum = rowSum + dayTotal;
        totalRowObj = {
          ...totalRowObj,
          [field]: parseFloat(dayTotal).toFixed(2),
        };
      }
    }
    totalRowObj = {
      ...totalRowObj,
      weekTotal: parseFloat(rowSum).toFixed(2),
    };

    dispatch(
      updateRow({
        rowIndex: totalRowIndex,
        rowObj: totalRowObj,
      })
    );
    // to check the total hours if equal to 40 then enable the button
    checkForTotalHours(totalRowObj);
  };

  //-------------- function for checking whether the total hours are greater than 40 or not here-----------------

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

  const handleDelete = async (rowId) => {
    // delete function
    setBatchCallType("delete");
    const timesheetEntries = prepareDeleteEntryPayload(rowId);
    const batchPayload = PrepareBatchPayload(timesheetEntries);
    const response = await makeBatchCall({ body: batchPayload });
  };

  const AllDaysColumns = DaysColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    dateWiseData,
  });

  // ---------------------- for handelling the columns and its data in dashboard screen---------------------

  const AllRowsColumns = RowsDataColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    isParent: false,
    dateWiseData,
    status,
  });

  const handleRejected = (hasNote) => {
    if (hasNote && hasNote?.size !== 0) {
      setTimesheetRejected(true);
    } else {
      setTimesheetRejected(false);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  // ------------ function for converting the rows data into columns here -------------------

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
      let timeEntries = [...dayData.TimeEntries.results];
      timeEntries.sort((a, b) =>
        a?.TimeEntryDataFields?.POSID?.localeCompare(
          b?.TimeEntryDataFields?.POSID
        )
      );
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

  useEffect(() => {
    if (dateWiseDataSuccessful && dateWiseData) {
      if (!newRow) {
        const responseData = dateWiseData;
        let transformedData = transformToWeeklyRows(responseData);
        const projectArray = transformedData.map((x) => x.project);
        // projectArray.forEach(project => {
        //   const
        // });
        transformedData = addTotalRow(transformedData);
        console.log("transformedData>>>>>>>", transformedData);
        // setProductTime(transformedData);
        dispatch(setProjectData(transformedData));
      }
    }
  }, [timeSheetDataFetching]);

  const ReviewData = ReviewColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    isParent: false,
    handleRejected,
    isPrevious: true,
  });

  const handleSubmit = () => {
    navigate("/addRows");
  };

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
        pernr: userData?.results[0].EmployeeNumber,
      });
    }
  };

  useEffect(() => {
    if (selectedDate && selectedDate?.length && selectedDate?.length > 0) {
      getTimesheetDataWeekWise();
    }
  }, [selectedDate, userData?.results[0].EmployeeNumber]);

  return (
    <>
      <StyledStack
        padding={{ xs: 1, sm: 2 }}
        height={{ xs: "80vh", sm: "80vh", md: "90vh", lg: "80vh" }}
      >
        <StyledBox justifyContent={"space-between"}>
          <Stack direction={"row"} alignItems={"center"}>
            <StyledToggleButtonGroup
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
                // disabled={disableToggel}
                onClick={() => handleNextWeek()}
              >
                <ArrowForwardIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            <StyledDateTypography>
              {selectedDate}
              {/* {Array.isArray(selectedDate) && selectedDate.length === 0
                ? formattedDateRange
                : selectedDate || formattedDateRange} */}
            </StyledDateTypography>
          </Stack>
          {/* <StyledDateTypography> */}
          <Stack direction={"row"} spacing={1} marginRight={"1rem"}>
            <HeaderTypography>Status :</HeaderTypography>

            <HeaderSubTypography
              style={{ color: StatusColorFormatter(status) }}
            >
              {StatusCaseFormatting(status)}
            </HeaderSubTypography>
          </Stack>
          {/* </StyledDateTypography> */}
        </StyledBox>
        <StyledStackButton
          direction={"row"}
          justifyContent={"space-between"}
          mt={2}
        >
          <DateRangePickerWithButtonField
            label={
              value[0] === null && value[1] === null
                ? null
                : value
                    .map((date) => (date ? date.format("MM/DD/YYYY") : "null"))
                    .join(" - ")
            }
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />

          {isSelectedDateGreaterThanCurrent() && (
            <Alert
              severity="warning"
              sx={{
                position: "absolute",
                top: "100%",
                left: "0",
                right: "0",
                zIndex: 1,
                marginTop: "8px",
              }}
            >
              You cannot select a date beyond the current week.
            </Alert>
          )}

          <Stack direction={"row"}>
            <Box sx={{ marginRight: "2%" }}>
              <Search onSearch={handleSearch} />
            </Box>
            <StyledButton2
              size="small"
              variant="outlined"
              boxShadow="5"
              onClick={handleOpen}
            >
              <FileCopyIcon
                fontSize="small"
                backgroundColor="#FFFF"
                sx={{ color: "#ED6A15" }}
              />
            </StyledButton2>
            <StyledButton2
              size="small"
              variant="outlined"
              sx={{ background: status === "Approved" ? "#dee2e6" : "#fff" }}
              disabled={status === "Approved"}
              onClick={handleSubmit}
            >
              {/* <StyledCircularBox
                sx={{ background: status === "Approved" ? "#dee2e6" : "#fff" }}
              > */}
              <AddCircleIcon
                fontSize="medium"
                color={status === "Approved" ? "#97928f" : "#ED6A15"}
                sx={{
                  color: status === "Approved" ? "#97928f" : "#ED6A15",
                }}
              />
              {/* </StyledCircularBox> */}
            </StyledButton2>
          </Stack>
        </StyledStackButton>
        <Stack mt={2} mb={10}>
          <TreeGrid
            columns={AllRowsColumns}
            density={"standard"}
            data={filteredData}
          />
          {/* {projectedData.map((item) => {
            const filterProjects = projectedData.filter(
              (x) => x.project === item.project
            );
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>{item.project}</Typography>
                </AccordionSummary>
                <TreeGrid
                  columns={AllRowsColumns}
                  density={"standard"}
                  data={filterProjects}
                />
              </Accordion>
            );
          })} */}
        </Stack>
      </StyledStack>
      <Footer>
        {status !== "Approved" && (
          <SaveTimeButton size="medium" onClick={() => handleSaveTime("save")}>
            <StyledSavedTimeText>Save My Time</StyledSavedTimeText>
          </SaveTimeButton>
        )}

        {status !== "Approved" && (
          <Button
            onClick={handleApproval}
            sx={{
              backgroundColor: saveTimeClick ? "#ED6A15" : "#BDBDBD",
              padding: "0.4rem",
              marginBottom: "0.5rem",
            }}
            disabled={
              !(
                projectedData &&
                Object?.keys(projectedData)?.length > 0 &&
                saveTimeClick
              )
            }
          >
            <StyledFooterText>
              {status !== "New" && status !== "Draft"
                ? "Resubmit Week for Approval"
                : "Submit Week for Approval"}
            </StyledFooterText>
          </Button>
        )}
      </Footer>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: "rgba(255, 255, 255, 0.9)",
          },
        }}
      >
        <Box sx={style}>
          <ModalTypography>Do you want to copy last week's</ModalTypography>
          <ModalTypography>timesheet?</ModalTypography>
          <ButtonStack direction="row" spacing={3} mt={4}>
            <CancelButton
              id="keep-mounted-modal-title"
              variant="h6"
              component="h2"
              size="small"
              onClick={() => handleClose()}
            >
              <CancelTypography>Cancel</CancelTypography>
            </CancelButton>
            <SaveButton
              id="keep-mounted-modal-description"
              sx={{ mt: 2 }}
              size="small"
              onClick={handleYes}
            >
              <SaveTypography>Yes</SaveTypography>
            </SaveButton>
          </ButtonStack>
        </Box>
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
          {/* Add Close Button */}
          <Stack direction={"row"} justifyContent={"end"}>
            <IconButton onClick={handleApprovalClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"}>
            <StyledModalBox>
              <AcknowledgeTypography>
                <ErrorOutlineIcon sx={{ width: "50px", height: "50px" }} />
              </AcknowledgeTypography>
              <AcknowledgeTypography>Acknowledgement</AcknowledgeTypography>
            </StyledModalBox>
          </Stack>

          {/* <Grid2 container>
            <Grid2 item sx={8} sm={8} md={8} lg={8} >
              <StyledModalBox>
                <AcknowledgeTypography>
                  <ErrorOutlineIcon sx={{ width: "50px", height: "50px" }} />
                </AcknowledgeTypography>
                <AcknowledgeTypography>Acknowledgement</AcknowledgeTypography>
              </StyledModalBox>
            </Grid2>
            <Grid2 item sx={4} sm={4} md={4} lg={4}>
              <IconButton onClick={handleApprovalClose}>
                <CloseIcon />
              </IconButton>
            </Grid2>
          </Grid2> */}

          <DescriptionTypography>{approvalMsg}</DescriptionTypography>
          <NoteButtonStack
            direction="row"
            justifyContent={"space-between"}
            spacing={3}
          >
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
              onClick={handelSaveNote}
            >
              <SaveNoteTypography>OK</SaveNoteTypography>
            </SaveNoteButton>
          </NoteButtonStack>
        </ApprovalBox>
      </Modal>
      <Modal
        open={isTimesheetCreated}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        BackdropProps={{
          style: {
            backgroundColor: "rgba(18, 18, 18, 0.6)",
          },
        }}
      >
        <StyledApprovalBox
          sx={{
            width: {
              xs: "80%",
              sm: "75%",
              md: "40%",
              lg: "25%",
            },
          }}
        >
          <Stack direction={"row"}>
            <IconButton onClick={() => setIsTimesheetCreated(false)}>
              <CloseIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Stack>
          <CheckCircleOutlineIcon
            color="#41AF6E"
            sx={{ color: "#41AF6E", width: "50px", height: "50px" }}
          />

          <TimesheetText>Your timesheet has been submitted</TimesheetText>
          <TimesheetText>for approval</TimesheetText>
          <CloseButton
            variant="outlined"
            // sx={{
            //   borderColor: "#ED6A15",
            //   color: "#ED6A15",
            //   mt: 2,
            // }}
            onClick={() => setIsTimesheetCreated(false)}
          >
            Close
          </CloseButton>
        </StyledApprovalBox>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Timesheet saved successfully.
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteMsgOpen}
        autoHideDuration={3000}
        onClose={() => setDeleteMsgOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setDeleteMsgOpen(false)}
          severity={"warning"}
          sx={{ width: "100%" }}
        >
          Timesheet deleted.
        </Alert>
      </Snackbar>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={"warning"}
          sx={{ width: "100%" }}
        >
          You can not select future date(s).
        </Alert>
      </Snackbar>
      <BusyDialog open={batchCallLoading || timeSheetDataFetching} />
    </>
  );
};
export default Home;
