import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
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
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import AddIcon from "@mui/icons-material/Add";
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
  setStatus,
  setTotal,
  updateRow,
  updateRowTotal,
} from "store/slice/TimesheetSlice";
import { ReviewColumns } from "components/ReviewColumns";
import { StatusCaseFormatting, StatusColorFormatter } from "utils/AppUtil";
import { useGetUserDataQuery } from "api/timesheetApi";
import { useGetDateWiseDetailsQuery } from "api/timesheetDashboardApi";

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
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#FFFFFF",
    },
    boxShadow: "0px 6px 10px rgba(0, 0, 0, 0.1)",
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

const dummyReviewData = [
  {
    day0: "2.00",
    day1: "2.00",
    day2: "2.00",
    day3: "2.00",
    day4: "2.00",
    day5: "0.00",
    day6: "0.00",
    isReject: true,
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
const Home = () => {
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const [allTimeData, setAllTimeData] = useState();
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const status = useSelector((state) => state?.CreateForm?.status);
  const approvalCount = useSelector(
    (state) => state?.CreateForm?.approvalCount
  );

  const [open, setOpen] = React.useState(false);
  const [approvalMsg, setApprovalMsg] = useState();
  const [openApproval, setOpenApproval] = React.useState(false);
  const [saveTimeClick, setSaveTimeClick] = useState(false);
  const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [isTimeSheetRejected, setTimesheetRejected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const [productTime, setProductTime] = useState([]);
  const [disableToggel, setDisableToggel] = useState(false);
  const handleClose = () => setOpen(false);
  const handleApprovalClose = () => setOpenApproval(false);
  const navigate = useNavigate();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const dispatch = useDispatch();

  const location = useLocation();
  const formattedDefaultRange = location.state?.week || "Default Week Range";
  const handleOpen = () => setOpen(true);
  const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
  const currentWeekStart = startOfCurrentWeek.format("DD");
  const endOfCurrentWeek = dayjs().endOf("week").add(1, "day");
  const formattedDateRange = `${startOfCurrentWeek.format("DD MMM YYYY")} - ${endOfCurrentWeek.format("DD MMM YYYY")}`;
  const { data: dateWiseData, isSuccess: dateWiseDataSuccessful } =
    useGetDateWiseDetailsQuery({
      startDate: startOfCurrentWeek,
      endDate: endOfCurrentWeek,
    });

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

  // console.log("ProductArray", ProductArray);

  const handleApproval = () => {
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
    if (approvalCount > 0) {
      dispatch(setStatus("Pending for approval"));
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
    setIsTimesheetCreated(true);
    let aCount = approvalCount + 1;
    dispatch(setApprovalCount(aCount));
    if (approvalCount >= 0) {
      dispatch(setStatus("Pending for approval"));
    }
  };



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

  const isSelectedDateGreaterThanCurrent = () => {
    // Return false if selectedDate is null, undefined, or not a string
    if (!selectedDate || typeof selectedDate !== 'string') return false;
    try {
      const selectedStartDate = dayjs(selectedDate.split(' - ')[0], 'DD MMM YYYY');
      const formattedStartDate = dayjs(formattedDateRange.split(' - ')[0], 'DD MMM YYYY');

      if (!selectedStartDate.isValid() || !formattedStartDate.isValid()) {
        return false;
      }

      return selectedStartDate.isAfter(formattedStartDate);
    } catch (error) {
      console.error('Error parsing dates:', error);
      return false;
    }
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
    const prevWeekStart = startOfPreviousWeek.format("DD");
    const endOfPreviousWeek = startOfPreviousWeek.add(6, "day");
    const newDateRange = `${startOfPreviousWeek.format("DD MMM YYYY")} - ${endOfPreviousWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
    dispatch(setStatus("Rejected"));

    if (prevWeekStart == currentWeekStart) {
      setIsCurrentWeek(true);
      dispatch(setStatus("New"));
      if (approvalCount > 0) {
        dispatch(setStatus("Pending for approval"));
      }
    } else {
      setIsCurrentWeek(false);
    }
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
    const today = dayjs(); // Get the current date

    // Validation: Prevent selecting a future week beyond the current date
    if (startOfNextWeek.isAfter(today)) {
      setAlertOpen(true);
      <Alert severity="warning">This is a warning Alert.</Alert>
      return;
    }

    const newDateRange = `${startOfNextWeek.format("DD MMM YYYY")} - ${endOfNextWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
    dispatch(setStatus("Rejected"));

    if (startOfNextWeek.isSame(currentStartDate, 'day')) {
      setDisableToggel(true);
    }

    if (startOfNextWeek.isSame(currentStartDate, 'day')) {
      setIsCurrentWeek(true);
      dispatch(setStatus("New"));
      if (approvalCount > 0) {
        dispatch(setStatus("Pending for approval"));
      }
    } else {
      setIsCurrentWeek(false);
    }
  };


  const handleSaveTime = () => {
    // setSaveTimeClick(true);
    const currentTime = new Date();
    setLastSavedTime(currentTime);
    setSnackbarOpen(true);
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

  const handleDelete = (rowId) => {
    // let tempRows = [...rows];
    // tempRows.splice(rowId, 1);
    // setRows(tempRows)
    // dispatch(setEstimates(tempRows));
    // updateCount(tempRows);
    dispatch(deleteProjectDataById(rowId));
  };

  const AllDaysColumns = DaysColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    dateWiseData,
  });

  const AllRowsColumns = RowsDataColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    isParent: false,
    dateWiseData,
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

  const transformToWeeklyRows = (response) => {
    const results = response?.results; // Extract the top-level results array
    const weekRows = []; // Array to store the transformed weekly data

    results.forEach((dayData, dayIndex) => {
      const timeEntries = dayData.TimeEntries.results; // Array of time entries for the day

      timeEntries.forEach((entry, entryIndex) => {
        // Parse work date

        console.log("entry", entry)
        const workDate = new Date(
          parseInt(entry.TimeEntryDataFields.WORKDATE.match(/\d+/)[0], 10)
        );
        const dayOfWeek = workDate.getDay(); // Get day of the week (0 = Sunday, 6 = Saturday)

        // Find or create a row for this entry in weekRows
        let weekRow = weekRows[entryIndex];
        if (!weekRow) {
          weekRow = {
            weekTotal: "0.00",
            project: entry?.TimeEntryDataFields?.AENAM,
            level: entry?.TimeEntryDataFields?.ERNAM,
            title: entry?.TimeEntryDataFields?.ERSTM,
            id: entryIndex + 1,
            day0: "0.00",
            day1: "0.00",
            day2: "0.00",
            day3: "0.00",
            day4: "0.00",
            day5: "0.00",
            day6: "0.00",
          };
          weekRows[entryIndex] = weekRow;
        }

        // Update the hours for the correct day of the week
        const hours = parseFloat(entry.TimeEntryDataFields.CATSHOURS || "0");
        const dayKey = `day${dayOfWeek}`;
        weekRow[dayKey] = (parseFloat(weekRow[dayKey]) + hours).toFixed(2);
      });
    });

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

    return weekRows;
  };

  useEffect(() => {
    if (dateWiseDataSuccessful && dateWiseData) {
      // new logic here
      // Example usage
      const responseData = dateWiseData;
      const transformedData = transformToWeeklyRows(responseData);
      console.log("transformedData>>>>>>>", transformedData);
      // old logic
      // let dayValues = {
      //   day0: "0.00",
      //   day1: "0.00",
      //   day2: "0.00",
      //   day3: "0.00",
      //   day4: "0.00",
      //   day5: "0.00",
      //   day6: "0.00",
      // };

      // let productData = [];
      // for (let i = 0; i < dateWiseData.results.length; i++) {
      //   const timeEntries = dateWiseData.results[i]?.TimeEntries?.results || [];
      //   for (let j = 0; j < timeEntries.length; j++) {
      //     const keys = productData.keys();
      //     let obj = {
      //       [`day${i}`]:
      //         timeEntries[j]?.TimeEntryDataFields?.CATSHOURS || "0.00",
      //     };
      //     productData.push(obj);
      //   }
      // }

      // console.log("productData", productData);

      // const productTimeDataArray = productData.map((result, index) => {
      //   // Use the first time entry's data for project details
      //   const firstTimeEntry = result?.TimeEntries?.results?.[0];

      //   console.log("result", result);

      //   return {
      //     ...dayValues,
      //     ...result,
      //     isReject: true,
      //     weekTotal: "10.00",
      //     project: firstTimeEntry?.TimeEntryDataFields?.AENAM,
      //     level: firstTimeEntry?.TimeEntryDataFields?.ERNAM,
      //     title: firstTimeEntry?.TimeEntryDataFields?.ERSTM,
      //     id: index + 1,
      //     hierarchy: [
      //       firstTimeEntry?.TimeEntryDataFields?.AENAM,
      //       firstTimeEntry?.TimeEntryDataFields?.ERNAM,
      //     ],
      //   };
      // });

      setProductTime(transformedData);
    }
  }, [dateWiseDataSuccessful, dateWiseData]);

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
                disabled={disableToggel}
                onClick={() => handleNextWeek()}
              >
                <ArrowForwardIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            <StyledDateTypography>
              {Array.isArray(selectedDate) && selectedDate.length === 0
                ? formattedDateRange
                : selectedDate || formattedDateRange}
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
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                zIndex: 1,
                marginTop: '8px'
              }}
            >
              You cannot select a date beyond the current week.
            </Alert>
          )}


          <Stack direction={"row"}>
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
              onClick={handleSubmit}
            >
              <StyledCircularBox>
                <AddIcon
                  fontSize="small"
                  color="#FFFF"
                  sx={{ color: "#FFFF" }}
                />
              </StyledCircularBox>
            </StyledButton2>
          </Stack>
        </StyledStackButton>
        <Stack mt={2} mb={10}>
          {isCurrentWeek ? (
            projectedData && Object?.keys(projectedData)?.length > 0 ? (
              <TreeGrid
                columns={AllRowsColumns}
                density={"standard"}
                data={projectedData}
              />
            ) : (
              // <MuiDataGrid
              //   disableColumnMenu={true}
              //   columns={AllDaysColumns}
              //   rows={productTime}
              //   density={"standard"}
              // />

              <TreeGrid
                columns={AllRowsColumns}
                density={"standard"}
                data={productTime}
              />
            )
          ) : (
            <TreeGrid
              columns={ReviewData}
              density={"standard"}
              data={dummyReviewData}
            />
          )}
        </Stack>
      </StyledStack>
      <Footer
        sx={{
          display: 'flex',
          justifyContent: { xs: 'center', md: 'space-between' },
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          width: '100%'
        }}
      >
        <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: 'center' }}>
          {!isCurrentWeek ? (
            <SaveTimeButton
              size="medium"
              onClick={handleSaveTime}
              fullWidth
            >
              <StyledSavedTimeText>Save My Time</StyledSavedTimeText>
            </SaveTimeButton>
          ) : (
            projectedData &&
            Object?.keys(projectedData)?.length > 0 && (
              <SaveTimeButton
                size="medium"
                onClick={handleSaveTime}
                fullWidth
              >
                <StyledSavedTimeText>Save My Time</StyledSavedTimeText>
              </SaveTimeButton>
            )
          )}
        </Box>

        <Box
          sx={{
            width: { xs: '100%', md: 'auto' },
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' }
          }}
        >
          {!isCurrentWeek ? (
            <Button
              onClick={handleApproval}
              fullWidth
              sx={{
                backgroundColor: "#ED6A15",
                padding: "0.4rem",
                marginBottom: "0.5rem",
              }}
            >
              <StyledFooterText>Submit Week for Approval</StyledFooterText>
            </Button>
          ) : (
            <Button
              onClick={handleApproval}
              fullWidth
              sx={{
                backgroundColor: saveTimeClick ? "#ED6A15" : "#BDBDBD",
                padding: "0.4rem",
                marginBottom: "0.5rem",
              }}
              disabled={!(
                projectedData &&
                Object?.keys(projectedData)?.length > 0 &&
                saveTimeClick
              )}
            >
              <StyledFooterText>Submit Week for Approval</StyledFooterText>
            </Button>
          )}
        </Box>
      </Footer>


      {/* <FooterBox>
        <div className="footer-content">
          {projectedData && Object?.keys(projectedData)?.length > 0 && (
            <div className="save-time-section">
              <SaveTimeButton
                size="medium"
                className="save-time-button"
                onClick={handleSaveTime}
              >
                <StyledSavedTimeText>Save My Time</StyledSavedTimeText>
              </SaveTimeButton>
              {lastSavedTime && (
                <Typography className="last-saved">
                  Last saved {formatDateTime(lastSavedTime)}
                </Typography>
              )}
            </div>
          )}
          <FooterButton
            className="submit-button"
            onClick={handleApproval}
            sx={{
              backgroundColor: saveTimeClick ? "#ED6A15" : "#BDBDBD",
            }}
            disabled={
              !(
                projectedData &&
                Object?.keys(projectedData)?.length > 0 &&
                saveTimeClick
              )
            }
          >
            <StyledFooterText>Submit Week for Approval</StyledFooterText>
          </FooterButton>
        </div>
      </FooterBox> */}
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
          You can not submit time for future date.
        </Alert>
      </Snackbar>
    </>
  );
};
export default Home;
