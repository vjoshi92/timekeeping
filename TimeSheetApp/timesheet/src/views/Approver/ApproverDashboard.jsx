import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Fade, IconButton, Modal, Popper, Stack, ToggleButton, Typography } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DaysColumns } from "components/CurrentWeekColumns";


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
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column"
};

const SubModalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 100,
  bgcolor: '#FFFF',
  boxShadow: 24,
  p: 4,
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column"
};

const StyledDateTypography = styled(Typography)(({ theme }) => ({
  fontSize: "22px",
  lineHeight: "26px",
  fontWeight: "500",
  padding: "0 8px",
  borderRadius: "4px",
}));

const SaveTypography = styled(Typography)(({ theme }) => ({
fontSize:"16px",
fontWeight:"700",
color:"#FFFF"
}));

const CancelTypography = styled(Typography)(({ theme }) => ({
  fontSize:"16px",
  fontWeight:"700",
  color:"#ED6A15"
}));

const StyledStackButton = styled(Stack)(({ theme }) => ({
  direction: "row"
}));

const ButtonStack = styled(Stack)(({ theme }) => ({
  direction: "row",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  marginTop:"2%"
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
  height: "34px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor:"#ED6A15",
  boxShadow: 1
}));

const CancelButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "34px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1
}));

const FooterButton = styled(Button)(({ theme }) => ({
  width: "95%",
  backgroundColor: "#ED6A15",
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

const StyledFooterText = styled(Typography)(({ theme }) => ({
  color: "#FFFF",
  fontWeight: "700",
  fontSize: "15px"
}));

const ModalTypography = styled(Typography)(({ theme }) => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontWeight: "700",
  fontSize: "15px"
}));

const ModalYesTypography = styled(Typography)(({ theme }) => ({
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontWeight: "700",
  fontSize: "15px",                                                                      
  color:"#41AF6E"
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
  backgroundColor: "#F4F7FE",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const ApproverDashboard = () => {
  const [alignment, setAlignment] = React.useState("left");
  const [value, setValue] = React.useState([null, null]);
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const [open, setOpen] = React.useState(false);
  const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleYes = () => {
    setOpen(false);
    setIsTimesheetCreated(true);
  };
  const handleTimesheetModalClose = () => setIsTimesheetCreated(false);
  
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const startOfCurrentWeek = dayjs().startOf('week').add(1, 'day'); 
  const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day'); 
  const formattedDateRange = `${startOfCurrentWeek.format('DD MMM YY')} - ${endOfCurrentWeek.format('DD MMM YY')}`;


  
    const rows = [
    { id: 1, day1: 'Data 1', day2: 'Data 2', day3: 'Data 3', day4: 'Data 4', day5: 'Data 5', day6: 'Data 6', day7: 'Data 7' },
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

  const AllDaysColumns = DaysColumns({ rows , selectedDate , handleInputChange , handleDelete});

  const handleSubmit = () => {
    navigate("/addRows")
  }
  return (
    <StyledStack
      padding={{ xs: 1, sm: 2 }}
      height={{ xs: "auto", sm: "90vh", md: "90vh", lg: "90vh" }}
    >
      <StyledBox>
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          sx={{ mr: 1 }}
        >
          <ToggleButton value="left" aria-label="left aligned">
            <ArrowBackIcon />
          </ToggleButton>
          <ToggleButton value="justify" aria-label="justified">
            <ArrowForwardIcon />
          </ToggleButton>
        </ToggleButtonGroup>

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
          <StyledButton1 size="small" variant="outlined" boxShadow="5" onClick={handleOpen}>
            <FileCopyIcon fontSize="small" backgroundColor="#FFFF" sx={{ color: "#BDBDBD" }} />
          </StyledButton1>
          <StyledButton2 size="small" variant="outlined" onClick={handleSubmit}>
            <StyledCircularBox>
              <AddIcon fontSize="small" color="#FFFF" sx={{ color: "#FFFF" }} />
            </StyledCircularBox>
          </StyledButton2>
        </Stack>
      </StyledStackButton>
      <Stack mt={2}>
        <MuiDataGrid
          columns={AllDaysColumns} rows={rows}
          density={"standard"}
        />
      </Stack>

      <FooterButton size="large" fullWidth>
        <StyledFooterText >
          Submit Week for Approval
        </StyledFooterText>
      </FooterButton>
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
          <ButtonStack direction="row" spacing={3}>

          <CancelButton id="keep-mounted-modal-title" variant="h6" component="h2" size="small" onClick={()=>handleClose()}>
          <CancelTypography>Cancel</CancelTypography>
          </CancelButton>
          <SaveButton id="keep-mounted-modal-description" sx={{ mt: 2 }} size="small"  onClick={handleYes}>
          <SaveTypography>Yes</SaveTypography>
         </SaveButton>
          </ButtonStack>
        </Box>
      </Modal>

      <Modal
       open={isTimesheetCreated} 
       onClose={handleTimesheetModalClose} 
      >
        <>
          {/* <CloseIcon sx={{position:"relative" }}/> */}
        <Box sx={SubModalstyle} >
            <CheckCircleOutlineIcon color="#41AF6E" sx={{color:"#41AF6E" , width:"50px" , height:"50px"}} />
          <ModalYesTypography>
           Your new timesheet has been created
          </ModalYesTypography>
        </Box>
        </>
      </Modal>
    </StyledStack>
  );
};
export default ApproverDashboard;
