import React, { useEffect, useRef, useState } from "react";
import { Backdrop, Box, Button, Fade, Modal, Popper, Stack, ToggleButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import FileCopyIcon from '@mui/icons-material/FileCopy';
import AddIcon from '@mui/icons-material/Add';
import MuiDataGrid from "../../components/MuiDataGrid";
import { getCurrentWeekDays, PRColumns } from "../../constant/Columns";
import DateRangePickerWithButtonField from "../../components/DateRangeButtonFeild";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DaysColumns } from "components/CurrentWeekColumns";
import { RowsDataColumns } from "components/RowsDataColumn";
import TreeGrid from "components/TreeGrid";
import MuiInput from "components/MuiInput";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import IconButton from '@mui/material/IconButton';
import { setDateRange } from "store/slice/HomeSlice";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 150,
  bgcolor: '#FBE1D0',
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

const ApprovalBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "320px",
  height: "300px",
  position: "relative",
  flexDirection: "column",
  padding: "20px"
}));

const SubModalstyle = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "320px",
  height: "300px",
  position: "relative",
  flexDirection: "column",
  padding: "20px"
}));

// const SubModalstyle = {
//   width: 400,
//   height: 100,
//   bgcolor: '#FFFF',
//   boxShadow: 24,
//   p: 4,
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexDirection: "column"
// };

const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  lineHeight: "26px",
  fontWeight: "500",
  padding: "0 8px",
  borderRadius: "4px",
}));

const SaveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#FFFF"
}));
const SaveNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#FFFF"
}));

const CancelTypography = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "700",
  color: "#ED6A15"
}));
const CancelNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: "600",
  color: "#ED6A15"
}));

const StyledStackButton = styled(Stack)(({ theme }) => ({
  direction: "row"
}));

const ButtonStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "4%"
}));

const NoteButtonStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginTop: "8%"
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
  boxShadow: 1
}));
const SaveNoteButton = styled(Button)(({ theme }) => ({
  width: "54px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1
}));

const CancelButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "45px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1
}));

const CancelNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "4px",
  border: "1px solid #ED6A15",
  boxShadow: 1
}));

const FooterButton = styled(Button)(({ theme }) => ({
  width: "95%",
  position: "absolute",
  bottom: "3%",
  [theme.breakpoints.up("sm")]: {
    width: "95%",
  },
  [theme.breakpoints.up("md")]: {
    width: "97%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "97%",
  }
}));
const SaveTimeButton = styled(Button)(({ theme }) => ({
  width: "40%",
  border: "1px solid #ED6A15",
  marginTop: "2%",
  [theme.breakpoints.up("xs")]: {
    width: "50%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "35%",
  },
  [theme.breakpoints.up("md")]: {
    width: "28%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "20%",
  },
  [theme.breakpoints.up("xl")]: {
    width: "15%",
  },
}));

const StyledFooterText = styled(Typography)(({ theme }) => ({
  color: "#FFFF",
  fontWeight: "700",
  fontSize: "15px"
}));

const StyledSavedTimeText = styled(Typography)(({ theme }) => ({
  color: "#ED6A15",
  fontWeight: "700",
  fontSize: "15px"
}));

const ModalTypography = styled(Typography)(({ theme }) => ({
  color: "#121212DE",
  fontWeight: "700",
  fontSize: "16px"
}));

const AcknowledgeTypography = styled(Typography)(({ theme }) => ({
  color: "#DD133F",
  fontWeight: "700",
  fontSize: "16px"
}));

const TimesheetText = styled(Typography)(({ theme }) => ({
  color: "#41AF6E",
  fontWeight: "700",
  fontSize: "16px"
}));
const DescriptionTypography = styled(Typography)(({ theme }) => ({
  color: "#121212DE",
  fontWeight: "400",
  fontSize: "16px"
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
              right: '-10px',
              top: '-30px',
              zIndex: 1
}));
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
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

const StyledApprovalBox = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  maxWidth: "500px", 
  boxShadow: 3, 
}));

const StyledApprovalIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
              top: "-36px",
              right: "0px",
              color: "white",
}));

const StyledStack = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
}));

const CloseButton = styled(Button)(({ theme }) => ({
  borderColor: "#ED6A15",
  color: "#ED6A15",
  marginTop:"4%"
}));

const StyledBox = styled(Box)(({ theme }) => ({
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const StyledModalBox = styled(Box)(({ theme }) => ({
display: "flex", 
flexDirection: "column", 
justifyContent: "flex-start", 
alignItems: "center", 
marginBottom: "5%"
}));

const Home = () => {
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const [open, setOpen] = React.useState(false);
  const [openApproval, setOpenApproval] = React.useState(false);
  const [saveTimeClick, setSaveTimeClick] = useState(false)
  const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
  const location = useLocation();
  const formattedDefaultRange = location.state?.week || 'Default Week Range';
  const handleOpen = () => setOpen(true);
  const handleApproval = () => setOpenApproval(true);
  const handelSaveNote = () => {
    setOpenApproval(false)
    setIsTimesheetCreated(true)
  };
  const handleClose = () => setOpen(false);
  const handleApprovalClose = () => setOpenApproval(false);
  const navigate = useNavigate();
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [lastSavedTime, setLastSavedTime] = useState(null);
  const dispatch = useDispatch()

  const formatDateTime = (date) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHours = hours % 12 || 12;

    return `${day}-${month}-${year} at ${formattedHours}:${minutes}${ampm}`;
  };
  const handlePreviousWeek = () => {
    // const currentStartDate = new Date(selectedDate[0]);
    // const currentEndDate = new Date(selectedDate[1]);
    
    // // Decrease 7 days
    // const newStartDate = new Date(currentStartDate.setDate(currentStartDate.getDate() - 7));
    // const newEndDate = new Date(currentEndDate.setDate(currentEndDate.getDate() - 7));
    
    // dispatch(setDateRange([newStartDate, newEndDate]));
  }
  
  const handleNextWeek = () => {
    // const currentStartDate = new Date(selectedDate[0]);
    // const currentEndDate = new Date(selectedDate[1]);
    
    // // Increase 7 days
    // const newStartDate = new Date(currentStartDate.setDate(currentStartDate.getDate() + 7));
    // const newEndDate = new Date(currentEndDate.setDate(currentEndDate.getDate() + 7));
    
    // dispatch(setDateRange([newStartDate, newEndDate]));
  }

  const handleSaveTime = () => {
    setSaveTimeClick(true)
    const currentTime = new Date();
    setLastSavedTime(currentTime);
  }
  const handleYes = () => {
    setOpen(false);
    setSaveTimeClick(false)
    // setIsTimesheetCreated(true);
  };
  const handleTimesheetModalClose = () => setIsTimesheetCreated(false);

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const startOfCurrentWeek = dayjs().startOf('week').add(1, 'day');
  const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day');
  const formattedDateRange = `${startOfCurrentWeek.format('DD MMM YY')} - ${endOfCurrentWeek.format('DD MMM YY')}`;



  const rows = [
    { id: 1, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0 },
  ];


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
    // dispatch(setEstimates(tempRows));
    // updateCount(tempRows);
  };

  const AllDaysColumns = DaysColumns({ rows, selectedDate, handleInputChange, handleDelete })
  const AllRowsColumns = RowsDataColumns({
    rows,
    selectedDate,
    handleInputChange,
    handleDelete,
    isParent: false
  });

  const handleSubmit = () => {
    navigate("/addRows")
  }

  return (
    <StyledStack
      padding={{ xs: 1, sm: 2 }}
      height={{ xs: "100vh", sm: "90vh", md: "90vh", lg: "90vh" }}
    >
      <StyledBox>
        <StyledToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton value="left" aria-label="left aligned" onClick={()=>handlePreviousWeek()}>
            <ArrowBackIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified" onClick={()=>handleNextWeek()}>
            <ArrowForwardIcon />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <StyledDateTypography>
          {Array.isArray(selectedDate) && selectedDate.length === 0
            ? formattedDateRange
            : selectedDate || formattedDateRange}
        </StyledDateTypography>

      </StyledBox>
      <StyledStackButton direction={"row"} justifyContent={"space-between"} mt={2}>
        <DateRangePickerWithButtonField
          label={
            value[0] === null && value[1] === null
              ? null
              : value.map((date) => (date ? date.format('MM/DD/YYYY') : 'null')).join(' - ')
          }
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />

        <Stack direction={"row"}   >
          <StyledButton2 size="small" variant="outlined" boxShadow="5" onClick={handleOpen}>
            <FileCopyIcon fontSize="small" backgroundColor="#FFFF" sx={{ color: "#ED6A15" }} />
          </StyledButton2>
          <StyledButton2 size="small" variant="outlined" onClick={handleSubmit}>
            <StyledCircularBox>
              <AddIcon fontSize="small" color="#FFFF" sx={{ color: "#FFFF" }} />
            </StyledCircularBox>
          </StyledButton2>
        </Stack>
      </StyledStackButton>
      <Stack mt={2}>
        {projectedData && Object?.keys(projectedData)?.length > 0 ? (
          <TreeGrid columns={AllRowsColumns} density={"standard"} data={projectedData} />
        ) : (
          <MuiDataGrid columns={AllDaysColumns} rows={rows} density={"standard"} />
        )}
      </Stack >
      <Stack direction={"column"} >
        {projectedData && Object?.keys(projectedData)?.length > 0 ? (
          <Stack direction="row" alignItems="center" spacing={2} mt={2}>

            <SaveTimeButton
              size="large"
              onClick={handleSaveTime}
              className="flex-shrink-0"
            >
              <StyledSavedTimeText>
                Save My Time
              </StyledSavedTimeText>
            </SaveTimeButton>
            {lastSavedTime && (
              <span className="text-gray-600 text-sm" >
                Last saved {formatDateTime(lastSavedTime)}
              </span>
            )}
          </Stack>
        ) : null}


        <FooterButton
          size="large"
          fullWidth
          onClick={() => handleApproval()}
          sx={{
            backgroundColor: saveTimeClick ? "#ED6A15" : "#BDBDBD",
          }}
          disabled={!(projectedData && Object?.keys(projectedData)?.length > 0 && saveTimeClick)}
        >
          <StyledFooterText>
            Submit Week for Approval
          </StyledFooterText>
        </FooterButton>
      </Stack>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        }}

      >
        <Box sx={style} >
          <ModalTypography>
            Do you want to copy last weeks's
          </ModalTypography>
          <ModalTypography>
            timesheet?
          </ModalTypography>
          <ButtonStack direction="row" spacing={3} mt={4}>
            <CancelButton id="keep-mounted-modal-title" variant="h6" component="h2" size="small" onClick={() => handleClose()}>
              <CancelTypography>Cancel</CancelTypography>
            </CancelButton>
            <SaveButton id="keep-mounted-modal-description" sx={{ mt: 2 }} size="small" onClick={handleYes}>
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
          alignItems: "center"
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: '#121212',
            opacity: "80%"
          }
        }}

      >
        <ApprovalBox>
          {/* Add Close Button */}
          <StyledIconButton
            onClick={handleApprovalClose}
            // sx={{
            //   position: 'absolute',
            //   right: '-10px',
            //   top: '-30px',
            //   zIndex: 1
            // }}
          >
            <CloseIcon sx={{ color: "#fff" }} />
          </StyledIconButton>
          <StyledModalBox >
            <AcknowledgeTypography>
              <ErrorOutlineIcon sx={{ width: "50px", height: "50px" }} />
            </AcknowledgeTypography>
            <AcknowledgeTypography>
              Acknowledgement
            </AcknowledgeTypography>
          </StyledModalBox>
          <DescriptionTypography>
            By signing this timesheet
            you are certifying that hours
            were incurred on the charge and
            day specified in accordance with
            company policies and procedures.
          </DescriptionTypography>
          <NoteButtonStack direction="row" spacing={3}>
            <CancelNoteButton id="keep-mounted-modal-title" variant="h6" component="h2" size="small" onClick={() => handleApprovalClose()}>
              <CancelNoteTypography>Cancel</CancelNoteTypography>
            </CancelNoteButton>
            <SaveNoteButton id="keep-mounted-modal-description" sx={{ mt: 2 }} size="small" onClick={handelSaveNote}>
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
          <CheckCircleOutlineIcon
            color="#41AF6E"
            sx={{ color: "#41AF6E", width: "50px", height: "50px" }}
          />
          <StyledApprovalIconButton
           onClick={() => setIsTimesheetCreated(false)}
            // sx={{
            //   position: "absolute",
            //   top: "-36px",
            //   right: "0px",
            //   color: "white",
            // }}
          >
            <CloseIcon sx={{ color: "#fff" }} />
          </StyledApprovalIconButton>
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
    </StyledStack >
  );
};
export default Home;
