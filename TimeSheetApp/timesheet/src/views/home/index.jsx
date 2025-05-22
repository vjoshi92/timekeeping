import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Modal,
  Snackbar,
  Stack,
  ToggleButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FileCopyIcon from "@mui/icons-material/FileCopy";
// import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DateRangePickerWithButtonField from "../../components/DateRangeButtonFeild";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from "@mui/icons-material/Close";
import dayjs from "dayjs";
import { DaysColumns } from "components/CurrentWeekColumns";
import { RowsDataColumns } from "components/RowsDataColumn";
import TreeGrid from "components/TreeGrid";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import IconButton from "@mui/material/IconButton";
import { setDateRange } from "store/slice/HomeSlice";
import { Footer } from "components/Footer";
import InfoIcon from '@mui/icons-material/Info';
import {
  deleteProjectDataById,
  setApprovalCount,
  setBatchCallTypeGlobal,
  setNewRowAdded,
  setProjectData,
  setStatus,
  updateRow,
} from "store/slice/TimesheetSlice";
import {
  checkStatusCondition,
  getODataFormatDate,
  getWeekStartDate,
  hasNonZeroEntry,
  hasValidTimeEntry,
  isCurrentDateAfter,
  PrepareBatchPayload,
  StatusCaseFormatting,
  StatusColorFormatter,
} from "utils/AppUtil";
import {
  useGetHierarchyDataQuery,
  useGetUserDataQuery,
  useGetWbsDataQuery,
  useLazyGetDateWiseDetailsQuery,
  useLazyGetPrevWeekDetailsQuery,
  useLazyGetWbsDataQuery,
  useMakeBatchCallMutation,
  useMakeDeleteBatchCallMutation,
} from "api/timesheetApi";
import BusyDialog from "components/BusyLoader";
import Search from "components/Search";

/**
 * Styled component
 */
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 150,
  bgcolor: "#FFF",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const ApprovalBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "30%",
  // height: "300px",
  position: "relative",
  flexDirection: "column",
  padding: "20px",
}));


const StyledDateTypography = styled(Typography)(() => ({
  fontSize: "22px",
  lineHeight: "26px",
  fontWeight: "500",
  padding: "0 8px",
  borderRadius: "4px",
}));

const HeaderTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: { xs: "12px", sm: "14px" },
  // color: "#121212DE",
  color: "#005AA6",
}));

const HeaderSubTypography = styled(Typography)(() => ({
  fontWeight: "600",
  fontSize: { xs: "14px", sm: "16px" },
  color: "#121212DE",
}));

const SaveTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#FFFF",
}));
const SaveNoteTypography = styled(Typography)(() => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#FFFF",
}));

const CancelTypography = styled(Typography)(() => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#ED6A15",
}));
const CancelNoteTypography = styled(Typography)(() => ({
  fontSize: "14px",
  fontWeight: "600",
  color: "#ED6A15",
}));

const StyledStackButton = styled(Stack)(() => ({
  direction: "row",
  height: "34px",
}));

const ButtonStack = styled(Stack)(() => ({
  direction: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "4%",
}));

const NoteButtonStack = styled(Stack)(() => ({
  direction: "row",
  display: "flex",
  // justifyContent: "flex-start",
  // alignItems: "center",
  marginTop: "8%",
}));

const StyledButton2 = styled(Button)(() => ({
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

const SaveButton = styled(Button)(() => ({
  width: "100px",
  height: "45px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));
const SaveNoteButton = styled(Button)(() => ({
  width: "54px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));

const CancelButton = styled(Button)(() => ({
  width: "100px",
  height: "45px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const CancelNoteButton = styled(Button)(() => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const StyledFooterText = styled(Typography)(() => ({
  color: "#FFFF",
  fontWeight: "700",
  fontSize: "14px",
}));

const ModalTypography = styled(Typography)(() => ({
  color: "#121212DE",
  fontWeight: "700",
  fontSize: "16px",
}));

const AcknowledgeTypography = styled(Typography)(() => ({
  color: "#DD133F",
  fontWeight: "700",
  fontSize: "16px",
}));

const TimesheetText = styled(Typography)(() => ({
  color: "#41AF6E",
  fontWeight: "700",
  fontSize: "16px",
}));

const DescriptionTypography = styled(Typography)(() => ({
  color: "#121212DE",
  fontWeight: "400",
  fontSize: "16px",
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
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

const StyledApprovalBox = styled(Box)(() => ({
  position: "relative",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  maxWidth: "500px",
  boxShadow: 3,
}));

const StyledStack = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
}));

const CloseButton = styled(Button)(() => ({
  borderColor: "#ED6A15",
  color: "#ED6A15",
  marginTop: "4%",
}));

const StyledBox = styled(Box)(() => ({
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const StyledModalBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "5%",
}));

const Home = () => {
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const [savedDateRange, setSavedDateRange] = useState();
  const status = useSelector((state) => state?.CreateForm?.status);
  const newRow = useSelector((state) => state?.CreateForm?.newRow);
  const [openApiMsg, setOpenApiMsg] = useState(false);
  const [apiMsg, setApiMsg] = useState("");
  const approvalCount = useSelector(
    (state) => state?.CreateForm?.approvalCount
  );

  const { refresh } = useParams();

  const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
  const currentWeekStart = startOfCurrentWeek.format("DD");

  const [open, setOpen] = React.useState(false);
  const [approvalMsg, setApprovalMsg] = useState();
  const [openApproval, setOpenApproval] = React.useState(false);
  const [saveTimeClick, setSaveTimeClick] = useState(false);
  const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteMsgOpen, setDeleteMsgOpen] = useState(false);
  const [batchCallType, setBatchCallType] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [totalError, setTotalError] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const handleClose = () => setOpen(false);
  const handleApprovalClose = () => setOpenApproval(false);
  const navigate = useNavigate();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [showNavConfirmation, setShowNavConfirmation] = useState(false);
  const [navConfType, setNavConfType] = useState('');
  const [isTimesheetChanged, setTimesheetChanged] = useState(false);
  const [calendarDate, setCalendarDate] = useState('');
  const [toBeDeleteRowId, setToBeDeleteRowId] = useState(-1);
  const [approver, setApprover] = useState('');
  // useEffect(() => {
  //   if (refresh === 'true') {
  //     navigate("/home");
  //   }   
  // }, [refresh])

  const [
    makeBatchCall,
    {
      isSuccess: batchCallIsSuccess,
      isLoading: batchCallLoading,
      isError: batchCallError,
      error: batchCallErrorResponse,
      data: batchSuccessData
    },
  ] = useMakeBatchCallMutation();

  const [
    deleteBatchCall,
    {
      isSuccess: deleteBatchCallIsSuccess,
      isLoading: deleteBatchCallLoading,
      isError: deleteBatchCallError,
      error: deleteBatchCallErrorResponse,
      data: deleteBatchSuccessData
    },
  ] = useMakeDeleteBatchCallMutation();


  // this is service call to get Timesheet data for selected week
  const [
    getTimesheetEntry,
    {
      data: dateWiseData,
      isSuccess: dateWiseDataSuccessful,
      isFetching: timeSheetDataFetching,
    },
  ] = useLazyGetDateWiseDetailsQuery();

  const [
    getPrevWeekTimesheetEntry,
    {
      data: prevWeekTimesheetData,
      isSuccess: prevWeekTimesheetSuccessful,
      isFetching: prevWeekTimesheetFetching,
    },
  ] = useLazyGetPrevWeekDetailsQuery();

  const { data: wbsData } = useGetWbsDataQuery({ selectedDate });
  const { data: userData } = useGetUserDataQuery();

  useEffect(() => {
    if (batchCallIsSuccess) {
      if (batchCallType == "approve") {
        setIsTimesheetCreated(true);
      } else if (batchCallType == "save") {
        setSnackbarOpen(true);
      }
      // delete is handled in another batch call, commented for future use
      // else if (batchCallType == "delete") {
      //   setDeleteMsgOpen(true);
      // }
      dispatch(setNewRowAdded(false));
      getTimesheetDataWeekWise();
    }

    if (batchCallError) {
      setApiMsg(batchCallErrorResponse);
      setOpenApiMsg(true);
    }
  }, [batchCallLoading]);

  useEffect(() => {
    if (deleteBatchCallIsSuccess && deleteBatchCallLoading == false) {
      setDeleteMsgOpen(true);
      // dispatch(setNewRowAdded(false));
      // splice the row after successfull deletion from BE
      dispatch(deleteProjectDataById(toBeDeleteRowId));
      const data = [...projectedData];
      const entry = projectedData.find((item) => item?.id == toBeDeleteRowId);
      const rowId = data.indexOf(entry);
      data.splice(rowId, 1);
      calculateRowsTotal(data);
      setToBeDeleteRowId(-1);
    }

    if (deleteBatchCallError && deleteBatchCallLoading == false) {
      setApiMsg(deleteBatchCallErrorResponse);
      setOpenApiMsg(true);
    }
  }, [deleteBatchCallLoading]);

  useEffect(() => {
    if (prevWeekTimesheetSuccessful && prevWeekTimesheetFetching === false) {
      // set invalid WBS entry to blank     
      const responseData = prevWeekTimesheetData;
      if (responseData?.results) {
        let { weekRows, invalidWBSEntry } = transformCopyWeeklyRows(responseData);
        let transformedData = weekRows;
        // add older data in array and then do total      
        if (transformedData && transformedData?.length > 0) {
          const data = transformedData.map(x => { if (x) return x; });
          data.sort((a, b) =>
            a?.project?.localeCompare(
              b?.project
            ) || a?.title?.localeCompare(
              b?.title
            )
          );
          transformedData = addTotalRow(data);
          dispatch(setProjectData(transformedData));

          if (invalidWBSEntry.length > 0) {
            const wbsNames = invalidWBSEntry.join(', ');
            setAlertMsg(`Some WBS entries were skipped as they are no longer active: ${wbsNames}. Please use the '+' button to add valid entries.`)
            setAlertOpen(true);
          }
        } else {
          if (invalidWBSEntry.length > 0) {
            const wbsNames = invalidWBSEntry.join(', ');
            setAlertMsg(`Some WBS entries were skipped as they are no longer active: ${wbsNames}. Please use the '+' button to add valid entries.`)
            setAlertOpen(true);
          } else {
            setAlertMsg("No time entry was found for the previous week. Please use the + button to add a WBS.")
            setAlertOpen(true);
          }
          // dispatch(setProjectData(transformedData));
        }
      } else {
        setAlertMsg("No time entry was found for the previous week. Please use the + button to add a WBS.")
        setAlertOpen(true);
      }
    }
  }, [prevWeekTimesheetFetching])

  useEffect(() => {
    setFilteredData(projectedData);
    const saveBtn = projectedData?.filter(x => !x.totalRow).length > 0;
    setShowSaveBtn(saveBtn);

    // set approved user name in local state        
    setApprover(projectedData[0]?.ApproverName)
    if (!projectedData[0]?.ApproverName) {
      dispatch(setStatus("New"));
    }
  }, [projectedData, toBeDeleteRowId]);

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      const filtered = projectedData?.filter(
        (item) =>
          item?.level?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          item?.title?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
          item?.project?.toLowerCase()?.includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(projectedData);
    }
  };

  //---------------------for showing different  modals on approvals----------------------------------------------  
  const handleApproval = () => {
    // const rejectedItems = projectedData
    const isRejectedItem = checkStatusCondition(projectedData, "40");
    if (isRejectedItem === true) {
      setAlertMsg("Please rectify the rejected entries and then resubmit for approval.");
      setAlertOpen(true);
      return;
    }

    const isPendingApr = checkStatusCondition(projectedData, "20");
    if (isPendingApr === true) {
      setApprovalMsg(
        "By modifying this signed timesheet, you are certifying that your time has been updated to align with your actual time worked, in accordance with company policies and procedures."
      );
    } else {
      setApprovalMsg(
        "By signing this timesheet, you are certifying that the hours incurred on the charge code and date specified are in accordance with company policies and procedures, and represent your actual time worked."
      );
    }
    setOpenApproval(true);
  };


  const handleApproveOk = () => {
    setOpenApproval(false);
    handleSaveTime("approve");
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
  const handlePreviousWeek = (skipPopup) => {
    if (isTimesheetChanged || newRow) {
      const isEmptyEntry = isNotEmptyEntries();
      if (skipPopup == false) {
        if ((status === "New" && isEmptyEntry) || status === "Draft" || status === "Rejected" || newRow) {
          if (status !== "Approved") {
            checkForUnsavedChanges("prev");
            return;
          }
        }
      }
    }



    // if ((skipPopup || (status !== "New" && status !== "Draft") || notEmptyEntry) || !newRow) {
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
    if (prevWeekStart == currentWeekStart) {
      setIsCurrentWeek(true);
    } else {
      setIsCurrentWeek(false);
    }
    dispatch(setNewRowAdded(false));
    // } else {

    // }
  };

  //----------------function for handelling the next week toggle buttons here ---------------------------

  const handleNextWeek = (skipPopup) => {
    if (isTimesheetChanged || newRow) {
      const isEmptyEntry = isNotEmptyEntries();
      if (skipPopup == false) {
        if ((status === "New" && isEmptyEntry) || status === "Draft" || status === "Rejected" || newRow) {
          if (status !== "Approved") {
            checkForUnsavedChanges("next");
            return;
          }
        }
      }
    }

    // if (skipPopup || (status !== "New" && status !== "Draft" && !newRow) || notEmptyEntry) {
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
    // commented code to allow future date selection
    // if (startOfNextWeek.isAfter(today)) {
    //   setAlertMsg("You can not select future date(s).");
    //   setAlertOpen(true);
    //   return;
    // }
    const newDateRange = `${startOfNextWeek.format("DD MMM YYYY")} - ${endOfNextWeek.format("DD MMM YYYY")}`;
    dispatch(setDateRange(newDateRange));
    dispatch(setNewRowAdded(false));
    // } else {
    //   checkForUnsavedChanges("next");
    // }
  };

  const checkForUnsavedChanges = (type) => {
    setNavConfType(type);
    setShowNavConfirmation(true);
  };

  const navAfterConfirmation = () => {
    if (navConfType === "prev") {
      handlePreviousWeek(true);
    } else if (navConfType === "next") {
      handleNextWeek(true);
    } else if (navConfType === "datePicker") {
      dispatch(setDateRange(calendarDate));
      dispatch(setNewRowAdded(false));
      setCalendarDate('');
    }
    setShowNavConfirmation(false);
    setNavConfType("");
    setTimesheetChanged(false);
  }

  useEffect(() => {
    if (selectedDate == "") {
      const startOfCurrentWeek = dayjs().startOf("week").add(1, "day");
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

    // check non zero entry
    let isNonZeroEntry = {
      isNonZero: true,
      msg: "",
      isValidEntry: true,
    };

    timesheetEntries.forEach(element => {
      const tempValue = hasNonZeroEntry(element);
      if (tempValue == false) {
        isNonZeroEntry = {
          isNonZero: tempValue,
          msg: `Please provide non-zero entry for <b>${element?.level} - ${element?.title}</b> or delete the row.`,
          isValidEntry: true
        };
        return;
      }
      const validEntry = hasValidTimeEntry(element);
      if (!validEntry) {
        isNonZeroEntry = { ...isNonZeroEntry, isValidEntry: validEntry };
      }
    });

    if (isNonZeroEntry?.isNonZero == false) {
      const msg = isNonZeroEntry?.msg;
      setAlertMsg(<span dangerouslySetInnerHTML={{ __html: msg }} />);
      setAlertOpen(true);
      return;
    }

    if (isNonZeroEntry?.isValidEntry == false) {
      setAlertMsg("Please provide valid input. Time entry must be less than or equal to 23 hours.");
      setAlertOpen(true);
      return;
    }

    if (totalError) {
      setAlertMsg("Please provide valid input. Time entry for given day, must be less than or equal to 24 hours.");
      setAlertOpen(true);
      return;
    }

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
        // removed the condition for zero entry filtering for save, instead we will be setting it as delete
        // if (entry[`day${i}`] && parseFloat(entry[`day${i}`]) > 0) {
        const entryStatus = entry[`day${i}STATUS`];
        if (entryStatus !== "40") {
          const temp = {
            __metadata: {
              type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
            },
            TimeEntryDataFields: {
              __metadata: {
                type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
              },
              CATSHOURS: entry[`day${i}`] || '0.00',
              PERNR: userData?.results[0].EmployeeNumber,
              CATSQUANTITY: entry[`day${i}`] || '0.00',
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
            AllowRelease: type === "approve" ? "X" : entryStatus === "20" ? "X" : "",
            RecRowNo: (entries.length + 1).toString(),
          };
          entries.push(temp);
        }
        // }
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
    setBatchCallType(type);
    if (isNotEmptyEntries()) {
      setTimesheetChanged(false);
      // make a batch call with payload
      const timesheetEntries = prepareTimesheetPayload(type);
      if (timesheetEntries && timesheetEntries.length > 0) {
        const batchPayload = PrepareBatchPayload(timesheetEntries);
        setSavedDateRange(selectedDate);
        const response = await makeBatchCall({ body: batchPayload });
        navAfterConfirmation();
      }
    }
  };

  const isNotEmptyEntries = () => {
    const entries = projectedData.filter(
      (item) => item?.totalRow !== true
    );
    return entries && entries?.length > 0;
  }

  const handleYes = () => {
    // timesheet copy functionality
    let currentStartDate;
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
    const startOfPreviousWeek = currentStartDate.subtract(7, "day");
    const endOfPreviousWeek = startOfPreviousWeek.add(6, "day");
    const startDate = startOfPreviousWeek.$d;
    const endDate = endOfPreviousWeek.$d;
    setOpen(false);
    setSaveTimeClick(false);
    const formattedStartDate = getODataFormatDate(startDate);
    const formattedEndDate = getODataFormatDate(endDate);
    getPrevWeekTimesheetEntry({
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      pernr: userData?.results[0].EmployeeNumber,
    });
  };


  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  //----------------function for handelling the change in input  ---------------------------

  const handleInputChange = (field, value, rowId) => {
    const rows = [...projectedData];
    let rowObj = rows.find((item) => item.id === rowId);
    const rowIndex = rows.indexOf(rowObj);
    // Convert input value to a number
    let parsedValue = parseFloat(value || 0);
    if (parsedValue > 23) {
      setAlertMsg("Please provide valid input. Time entry must be less than or equal to 23 hours.");
      setAlertOpen(true);
      setTotalError(true);
    } else {
      setTotalError(false);
    }
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
    // set input change flag true
    setTimesheetChanged(true);
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
    if (dayTotal > 24) {
      setAlertMsg("Please provide valid input. Time entry for given day, must be less than or equal to 24 hours.");
      setAlertOpen(true);
      setTotalError(true);
    } else {
      setTotalError(false);
    }
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
      let isDayTotalCorrect = true;
      for (let i = 0; i <= 4; i++) {
        if (parseFloat(totalRowObj[`day${i}`]) < 8) {
          isDayTotalCorrect = false;
        }
      }
      if (isDayTotalCorrect) {
        setSaveTimeClick(true);
      } else {
        setSaveTimeClick(false);
      }
    } else {
      setSaveTimeClick(false);
    }
  };

  const handleDelete = async (rowId) => {

    const entry = projectedData.find((item) => item?.id == rowId);
    if (entry.newRow) {
      dispatch(deleteProjectDataById(rowId));
      const data = [...projectedData];
      data.splice(rowId, 1);
      calculateRowsTotal(data);
    } else {
      // delete function
      setBatchCallType("delete");
      setToBeDeleteRowId(rowId);
      const timesheetEntries = prepareDeleteEntryPayload(rowId);
      const batchPayload = PrepareBatchPayload(timesheetEntries);
      const response = await deleteBatchCall({ body: batchPayload });
    }
  };


  // ---------------------- for handelling the columns and its data in dashboard screen---------------------
  const calculateRowsTotal = (tProjectData) => {
    let projectData = [];
    if (tProjectData) {
      projectData = tProjectData;
    } else {
      projectData = projectedData;
    }

    let transformedData = projectData.filter(x => !x.totalRow);
    let total = projectedData.find(x => x.totalRow);

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
    const totalIndex = projectData.indexOf(total);
    let data = [...transformedData];
    data.forEach((item) => {
      for (let i = 0; i <= 6; i++) {
        totalsRow[`day${i}`] = parseFloat(totalsRow[`day${i}`] || "0") + parseFloat(item[`day${i}`] || "0");
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
    dispatch(updateRow({
      rowObj: totalsRow,
      rowIndex: totalIndex
    }));
  };

  const AllRowsColumns = RowsDataColumns({
    selectedDate,
    handleInputChange,
    handleDelete,
    isParent: false,
    dateWiseData,
    status,
    setAlertMsg,
    setAlertOpen,
    setBatchCallType,
    updateTotalRow
  });

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
    // here i is consider as row data
    for (let i = 0; i < results?.length; i++) {
      let dayData = results[i];
      const data = dayData?.TimeEntries?.results;
      let timeEntries = [...data];
      timeEntries.sort((a, b) =>
        a?.TimeEntryDataFields?.POSID?.localeCompare(
          b?.TimeEntryDataFields?.POSID
        )
      );
      for (let j = 0; j < timeEntries?.length; j++) {
        let entry = timeEntries[j];
        // if entry is zero from BE and status is 10 then we need to omit that entry
        if ((entry?.TimeEntryDataFields?.CATSHOURS == "0.00" ||
          entry?.TimeEntryDataFields?.CATSHOURS == 0) && entry?.Status === "10"
        ) {
          continue;
        }
        const hours = parseFloat(entry.TimeEntryDataFields.CATSHOURS || "0");
        const dayKey = `day${i}`;
        let weekRow;
        let rowIndex = -1;
        let rowExist = weekRows.filter(
          (x) => x.level === entry?.TimeEntryDataFields?.POSID
        );
        if (rowExist && rowExist.length && rowExist.length > 0) {
          weekRow = rowExist[0];
          rowIndex = weekRows.indexOf(weekRow);
        }
        // Update the hours for the correct day of the week
        if (!weekRow) {
          weekRow = {
            weekTotal: "0.00",
            project: entry?.TimeEntryDataFields?.PSPID_DESC,
            level: entry?.TimeEntryDataFields?.POSID,
            title: entry?.TimeEntryDataFields?.POST1,
            smartId: entry?.TimeEntryDataFields?.USR00 || "--",
            id: Math.random(),
            hierarchy: [
              entry?.TimeEntryDataFields?.PSPID_DESC,
              `${entry?.TimeEntryDataFields?.POST1}-${entry?.TimeEntryDataFields?.POSID}`,
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
        if (entry?.ApproverName) {
          weekRow.ApproverName = entry?.ApproverName;
        }
        if (rowIndex >= 0) {
          weekRows[rowIndex] = weekRow;
        } else {
          weekRows.push(weekRow);
        }
        // all status check
        if (entry?.Status === "10") {
          weeklyStatus.Draft = weeklyStatus.Draft + 1;
        }
        else if (entry?.Status === "40") {
          weeklyStatus.Rejected = weeklyStatus.Rejected + 1;
        }
        else if (entry?.Status === "20") {
          weeklyStatus.SubmitForApproval = weeklyStatus.SubmitForApproval + 1;
        }
        else if (entry?.Status === "30") {
          weeklyStatus.Approved = weeklyStatus.Approved + 1;
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
    if (weeklyStatus.Draft > 0) {
      dispatch(setStatus("Draft"));
    } else if (weeklyStatus.Rejected > 0) {
      dispatch(setStatus("Rejected"));
    } else if (weeklyStatus.SubmitForApproval > 0) {
      dispatch(setStatus("Pending For Approval"));
    } else if (weeklyStatus.Approved > 0) {
      dispatch(setStatus("Approved"));
    } else {
      dispatch(setStatus("New"));
    }
    return weekRows;
  };

  const transformCopyWeeklyRows = (response) => {
    const results = response?.results; // Extract the top-level results array
    const weekRows = []; // Array to store the transformed weekly data    
    let invalidWBSEntry = [];
    // here i is consider as row data
    for (let i = 0; i < results?.length; i++) {
      let dayData = results[i];
      const data = dayData?.TimeEntries?.results;
      let timeEntries = [...data];
      timeEntries.sort((a, b) =>
        a?.TimeEntryDataFields?.POSID?.localeCompare(
          b?.TimeEntryDataFields?.POSID
        )
      );
      for (let j = 0; j < timeEntries?.length; j++) {
        let entry = timeEntries[j];
        // if entry is zero from BE and status is 10 then we need to omit that entry
        if ((entry?.TimeEntryDataFields?.CATSHOURS == "0.00" ||
          entry?.TimeEntryDataFields?.CATSHOURS == 0) && entry?.Status === "10"
        ) {
          continue;
        }
        // check for WBS id is valid or not
        const wbs = wbsData?.results;
        const entryWBS = wbs.filter(x => x.POSID === entry?.TimeEntryDataFields?.POSID);
        if (entryWBS && entryWBS?.length === 0) {
          // const wbsEntry = entryWBS[0];
          // const validWbs = isCurrentDateAfter(wbsEntry?.ENDDA);
          // if (!validWbs) {
          if (!invalidWBSEntry.includes(entry?.TimeEntryDataFields?.POST1)) {
            invalidWBSEntry.push(entry?.TimeEntryDataFields?.POST1);
          }
          console.log("invalidWBSEntry", invalidWBSEntry);
          continue;
          // }
        }

        const hours = 0.00;
        const dayKey = `day${i}`;
        let weekRow;
        let rowIndex = -1;
        let rowExist = weekRows.filter(
          (x) => x.level === entry?.TimeEntryDataFields?.POSID
        );
        if (rowExist && rowExist.length && rowExist.length > 0) {
          weekRow = rowExist[0];
          rowIndex = weekRows.indexOf(weekRow);
        }
        // Update the hours for the correct day of the week
        if (!weekRow) {
          weekRow = {
            weekTotal: "0.00",
            project: entry?.TimeEntryDataFields?.PSPID_DESC,
            level: entry?.TimeEntryDataFields?.POSID,
            title: entry?.TimeEntryDataFields?.POST1,
            smartId: entry?.TimeEntryDataFields?.USR00 || "--",
            id: Math.random(),
            hierarchy: [
              entry?.TimeEntryDataFields?.PSPID_DESC,
              `${entry?.TimeEntryDataFields?.POST1}-${entry?.TimeEntryDataFields?.POSID}`,
            ],
            day0: "0.00",
            day1: "0.00",
            day2: "0.00",
            day3: "0.00",
            day4: "0.00",
            day5: "0.00",
            day6: "0.00",
            newRow: true
          };
          weekRow = {
            ...weekRow,
            [dayKey]: hours.toFixed(2),
            [`${dayKey}Counter`]: "",
            [`${dayKey}timeEntryOperation`]: "C",
            [`${dayKey}AllowRelease`]: "",
            [`${dayKey}STATUS`]: "10",
            [`${dayKey}Notes`]: "",
            [`${dayKey}WORKDATE`]: entry?.TimeEntryDataFields?.WORKDATE,
          };
        }

        if (rowIndex < 0) {
          weekRows.push(weekRow);
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
    dispatch(setStatus("New"));
    return { weekRows, invalidWBSEntry };
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
      if (item) {
        for (let i = 0; i <= 6; i++) {
          totalsRow[`day${i}`] = parseFloat(totalsRow[`day${i}`] || "0") + parseFloat(item[`day${i}`] || "0");
        }
        totalsRow.weekTotal = parseFloat(totalsRow.weekTotal || "0") + parseFloat(item.weekTotal || "0");
      }

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
        // add older data in array and then do total
        // check this condition properly to rectify the issue
        if (batchCallType !== "approve" && batchCallType !== "save" && batchCallType !== "delete"
          && batchCallType !== "newData"
        ) {
          const oldData = [...projectedData];
          const newRows = oldData.filter(item => item.newRow);
          newRows.forEach(element => {
            transformedData.unshift(element);
          });
        } else {
          setBatchCallType("");
          dispatch(setBatchCallTypeGlobal(""));
        }
        const data = transformedData.map(x => { if (x) return x; })
        data.sort((a, b) =>
          a?.project?.localeCompare(
            b?.project
          ) || a?.title?.localeCompare(
            b?.title
          )
        );
        transformedData = addTotalRow(data);
        dispatch(setProjectData(transformedData));
      } else {
        if (projectedData && projectedData.length > 1) {
          const totalRow = projectedData.filter(x => x.totalRow === true);
          checkForTotalHours(totalRow[0]);
        }
      }
    }
  }, [timeSheetDataFetching]);

  const addNewRow = () => {
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

  const onCalendarDateChange = (newDate) => {
    if (isTimesheetChanged || newRow) {
      const isEmptyEntry = isNotEmptyEntries();
      if ((status === "New" && isEmptyEntry) || status === "Draft" || status === "Rejected" || newRow) {
        if (status !== "Approved") {
          checkForUnsavedChanges("datePicker");
          setCalendarDate(newDate);
          return;
        }
      }
    } else {
      setCalendarDate('');
      dispatch(setDateRange(newDate));
    }
  };

  useEffect(() => {
    if (selectedDate && selectedDate?.length && selectedDate?.length > 0) {
      getTimesheetDataWeekWise();
      setBatchCallType("newData");
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
              <ToggleButton sx={{ color: "#000" }}
                value="left"
                aria-label="left aligned"
                onClick={() => handlePreviousWeek(false)}
              >
                <ArrowBackIcon />
              </ToggleButton>
              <ToggleButton sx={{ color: "#000" }}
                value="justify"
                aria-label="justified"
                // disabled={disableToggel}
                onClick={() => handleNextWeek(false)}
              >
                <ArrowForwardIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
            <StyledDateTypography>
              {selectedDate}
            </StyledDateTypography>
          </Stack>
          <Stack direction={"row"} spacing={4} marginRight={"1rem"}>
            <Stack direction={"row"} spacing={1}>
              <HeaderTypography>Approver:</HeaderTypography>
              <HeaderSubTypography>
                {approver}
              </HeaderSubTypography>
            </Stack>
            <Stack direction={"row"} spacing={1}>
              <HeaderTypography>Status:</HeaderTypography>
              <HeaderSubTypography
                style={{ color: StatusColorFormatter(status) }}
              >
                {StatusCaseFormatting(status)}
              </HeaderSubTypography>
            </Stack>
          </Stack>
        </StyledBox>
        <StyledStackButton
          direction={"row"}
          justifyContent={"space-between"}
          mt={2}
        >
          <DateRangePickerWithButtonField
            onChange={onCalendarDateChange}
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
            <Tooltip title="Copy from previous week.">
              <StyledButton2
                size="small"
                variant="outlined"
                sx={{ background: status === "New" ? "#fff" : "#dee2e6" }}
                disabled={status !== "New"}
                boxShadow="5"
                onClick={() => setOpen(true)}
              >
                <FileCopyIcon
                  fontSize="small"
                  backgroundColor="#FFFF"
                  color={status !== "New" ? "#97928f" : "#ED6A15"}
                  sx={{
                    color: status !== "New" ? "#97928f" : "#ED6A15",
                  }}
                />
              </StyledButton2>
            </Tooltip>
            <Tooltip title="Add new timesheet entry.">
              <StyledButton2
                size="small"
                variant="outlined"
                sx={{ background: status === "Approved" ? "#dee2e6" : "#fff" }}
                disabled={status === "Approved"}
                onClick={addNewRow}
              >
                <AddCircleIcon
                  fontSize="medium"
                  color={status === "Approved" ? "#97928f" : "#ED6A15"}
                  sx={{
                    color: status === "Approved" ? "#97928f" : "#ED6A15",
                  }}
                />
              </StyledButton2>
            </Tooltip>
          </Stack>
        </StyledStackButton>
        <Stack mt={2} mb={10}>
          <TreeGrid
            columns={AllRowsColumns}
            density={"standard"}
            data={filteredData}
          />
        </Stack>
      </StyledStack>
      <Footer>
        {status !== "Approved" && (
          <Tooltip title="Save timesheet entry.">
            <Button
              disabled={!showSaveBtn}
              sx={{
                backgroundColor: showSaveBtn ? "#FFF" : "#BDBDBD",
                color: showSaveBtn ? '#ED6A15' : '#fff',
                border: `1px solid ${showSaveBtn ? '#ED6A15' : '#fff'}`,
                marginBottom: "0.5rem",
              }}
              size="medium" onClick={() => handleSaveTime("save")}>
              <Typography fontWeight={"700"} fontSize={"14px"}
                color={showSaveBtn ? '#ED6A15' : '#fff'}>Save My Time</Typography>
            </Button>
          </Tooltip>
        )}

        {status !== "Approved" && (
          <Stack direction={"row"} spacing={0.1} alignItems={"center"}>
            <Tooltip title="Please ensure you log at least 40 hours per week and 8 hours per weekday to enable submission.">
              <IconButton>
                <InfoIcon sx={{ color: "#ED6A15" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Please ensure you log at least 40 hours per week and 8 hours per weekday to enable submission.">
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
                  {checkStatusCondition(projectedData, "20")
                    ? "Resubmit Week for Approval"
                    : "Submit Week for Approval"}
                </StyledFooterText>
              </Button>
            </Tooltip>
          </Stack>
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
              onClick={handleApproveOk}
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

          <TimesheetText>Your timesheet for {selectedDate} has been submitted for approval</TimesheetText>
          <CloseButton
            variant="outlined"
            onClick={() => setIsTimesheetCreated(false)}
          >
            Close
          </CloseButton>
        </StyledApprovalBox>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={"success"}
          sx={{ width: "100%" }}
        >
          Timesheet saved successfully for {savedDateRange}
        </Alert>
      </Snackbar>
      <Snackbar
        open={deleteMsgOpen}
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
        resumeHideDuration={10000}
        autoHideDuration={10000}
        open={alertOpen}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setAlertOpen(false);
        }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setAlertOpen(false);
          }}
          severity={"warning"}
          sx={{ width: "100%" }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <Modal
        open={showNavConfirmation}
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
        >
          <Stack direction={"row"} justifyContent={"right"}>
            <IconButton onClick={() => setShowNavConfirmation(false)}>
              <CloseIcon sx={{ color: "#ED6A15" }} />
            </IconButton>
          </Stack>
          <WarningIcon
            color="#ED6A15"
            sx={{ color: "#ED6A15", width: "50px", height: "50px" }}
          />

          <Typography fontWeight={700}>Your unsaved changes will be lost. Do you want to continue?</Typography>
          <NoteButtonStack
            direction="row"
            justifyContent={"space-between"}
            spacing={3}
          >
            {/* <Button sx={{ border: "1px solid #ED6A15", }}

              variant="h6"
              component="h2"
              size="small"
              onClick={() => { setShowNavConfirmation(false); setNavConfType(""); }}
            >
              <Typography color="#ED6A15" fontWeight={700}>Cancel</Typography>
            </Button> */}
            <Button sx={{ border: "1px solid #ED6A15", }}

              variant="h6"
              component="h2"
              size="small"
              onClick={() => navAfterConfirmation()}
            >
              <Typography color="#ED6A15" fontWeight={700}>Skip Saving</Typography>
            </Button>
            <Button

              sx={{ backgroundColor: "#ED6A15", }}
              component="h2"
              size="small"
              onClick={() => { setShowNavConfirmation(false); handleSaveTime("save") }}
            >
              <Typography color="#FFF" fontWeight={700}>Save Changes</Typography>
            </Button>
          </NoteButtonStack>
        </StyledApprovalBox>
      </Modal>
      <BusyDialog open={batchCallLoading || timeSheetDataFetching || prevWeekTimesheetFetching || deleteBatchCallLoading} />
      <Snackbar
        open={openApiMsg}
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
export default Home;
