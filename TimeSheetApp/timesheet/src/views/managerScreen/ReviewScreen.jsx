import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Fade, IconButton, Modal, Popper, Stack, ToggleButton, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import MuiDataGrid from "../../components/MuiDataGrid";
import { getCurrentWeekDays, PRColumns } from "../../constant/Columns";
import DateRangePickerWithButtonField from "../../components/DateRangeButtonFeild";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DaysColumns } from "components/CurrentWeekColumns";
import TreeDataGrid from "components/TreeDataGrid";
import { RowsDataColumns } from "components/RowsDataColumn";
import TreeGrid from "components/TreeGrid";
import MuiInput from "components/MuiInput";
import { useLocation } from 'react-router-dom';
import { ReviewColumns } from "components/ReviewColumns";
import { ArrowBackIosNew } from "@mui/icons-material";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 150,
    bgcolor: '#FFFFFF',
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
    width: "355px",
    height: "250px",
    // justifyContent: "center",
    // alignItems: "center",
    flexDirection: "column",
    padding: "20px"
}));

const MainBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
}));

const SubBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center"
}));

const SubModalstyle = {

    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 100,
    bgcolor: '#FFFF',
    boxShadow: 24,
    p: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
};

const StyledDateTypography = styled(Typography)(({ theme }) => ({
    fontSize: "22px",
    lineHeight: "26px",
    fontWeight: "500",
    padding: "0 8px",
    borderRadius: "4px",
}));

const RejectButton = styled(Button)(({ theme }) => ({
    // width: { xs: "100%", sm: "200px" },
    height: "42px"
}));

const ApproveButton = styled(Button)(({ theme }) => ({

    height: "42px"
}));


const ButtonStack = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: { xs: "10px", sm: "20px" },
    width: "100%",
    marginTop: "1%"
}));

const SaveNoteTypography = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    fontWeight: "700",
    color: "#FFFF"
  }));

  const CancelNoteTypography = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    fontWeight: "700",
    color: "#005AA6"
  }));

const CancelNoteButton = styled(Button)(({ theme }) => ({
    width: "100px",
    height: "42px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "1px solid #005AA6",
    boxShadow: 1
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
    borderColor: "#ED6A15"
}));


const SaveNoteButton = styled(Button)(({ theme }) => ({
    width: "100px",
    height: "42px",
    marginRight: "10px",
    borderRadius: "6px",
    backgroundColor: "#005AA6",
    boxShadow: 1
  }));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    fontSize: { xs: "12px", sm: "14px" },
    color: "#005AA6"
}));

const HeaderSubTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "400",
    fontSize: { xs: "14px", sm: "16px" },
    color: "#121212DE"
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
    fontSize: "22px"
  }));

const HeaderBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    padding: { xs: "10px", sm: "0" }
}));

const NoteButtonStack = styled(Stack)(({ theme }) => ({
    direction: "row",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "8%"
  }));

const ReviewScreen = () => {
    const { state } = useLocation();
    const { data } = state || {};
    const [alignment, setAlignment] = React.useState("left");
    const [value, setValue] = React.useState([null, null]);
    const selectedDate = useSelector((state) => state?.home?.daterange);
    const [open, setOpen] = React.useState(false);
    const [openApproval, setOpenApproval] = React.useState(false);
    const [isTimesheetCreated, setIsTimesheetCreated] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleApproval = () => setOpenApproval(true);
    const handelSaveNote = () => setOpenApproval(true);
    const handleClose = () => setOpen(false);
    const handleApprovalClose = () => setOpenApproval(false);
    const navigate = useNavigate();
    const projectedData = useSelector((state) => state?.CreateForm?.projectData);

    if (!data) {
        return <div>No data available</div>;
    }

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleSubmit = () => {
        navigate("/addRows")
    }

    const handleApprove = ()=>{

    }

    const handleReject = ()=>{
        
    }
    const rows = [
        { id: 1, day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0 },
    ];

    const dummyReviewData = [
        {
            day0: "9",
            day1: "7",
            day2: "5",
            day3: "4",
            day4: "6",
            day5: "0",
            day6: "",
            project: "JMA NOFO 2 SRFA 1",
            level: "Mechanical Design",
            id: 1,
            hierarchy: ["JMA NOFO 2 SRFA 1", "Mechanical Design"],
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
            id: 2,
            hierarchy: ["JMA NOFO 2 SRFA 1", "Technical Documentation"],
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
            id: 3,
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
            level: "PTO",
            id: 4,
            hierarchy: ["Non-NOFO", "PTO"],
        },
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

    const ReviewData = ReviewColumns({
        rows,
        selectedDate,
        handleInputChange,
        handleDelete,
        isParent: false
    });

    const startOfCurrentWeek = dayjs().startOf('week').add(1, 'day');
    const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day');
    const formattedDateRange = `${startOfCurrentWeek.format('DD MMM YY')} - ${endOfCurrentWeek.format('DD MMM YY')}`;

    return (
        <StyledStack
            padding={{ xs: 1, sm: 1 }}
            height={{ xs: "auto", sm: "90vh", md: "90vh", lg: "90vh" }}
            paddingX={{ xs: 2, sm: 10 }} // Slightly more padding on mobile
        >
            <HeaderBox
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 2, sm: 0 }
                }}
            >
                <ArrowBackIosNew
                    sx={{
                        color: "#005AA6",
                        mb: { xs: 2, sm: 0 },
                        mr: { sm: 2 }
                    }}
                    onClick={() => navigate(-1)}
                />
                <HeaderStack
                    sx={{
                        flexDirection: { xs: 'column', sm: 'row' },
                        width: '100%',
                        justifyContent: 'flex-end',
                        gap: { xs: 2, sm: 0 }
                    }}
                >
                    <Stack
                        sx={{
                            padding: { xs: 1, sm: 3 },
                            paddingRight: { xs: 1, sm: 10 },
                            alignItems: { xs: 'flex-start', sm: 'inherit' }
                        }}
                    >
                        <HeaderTypography>Employee Name</HeaderTypography>
                        <HeaderSubTypography>{data?.employeeName}</HeaderSubTypography>
                    </Stack>
                    <Stack
                        sx={{
                            padding: { xs: 1, sm: 3 },
                            paddingRight: { xs: 1, sm: 10 },
                            alignItems: { xs: 'flex-start', sm: 'inherit' }
                        }}
                    >
                        <HeaderTypography>Employee ID</HeaderTypography>
                        <HeaderSubTypography>{data?.employeeId}</HeaderSubTypography>
                    </Stack>
                    <Stack
                        sx={{
                            padding: { xs: 1, sm: 3 },
                            paddingRight: { xs: 1, sm: 10 },
                            alignItems: { xs: 'flex-start', sm: 'inherit' }
                        }}
                    >
                        <HeaderTypography>Status</HeaderTypography>
                        <HeaderSubTypography>{data?.status}</HeaderSubTypography>
                    </Stack>
                </HeaderStack>
            </HeaderBox>
            <Divider sx={{ marginBottom: "2%" }} />
            <StyledBox>
                <MainBox >

                    <SubBox
                        sx={{
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "flex-start", sm: "center" },
                            gap: { xs: "10px", sm: "0" }
                        }}>
                        <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="text alignment"
                            sx={{

                            }}
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
                        <DateRangePickerWithButtonField
                            label={
                                value[0] === null && value[1] === null
                                    ? null
                                    : value.map((date) => (date ? date.format('MM/DD/YYYY') : 'null')).join(' - ')
                            }
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                        />
                    </SubBox>
                    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                        <StyledButton2 size="small" variant="outlined" boxShadow="5" onClick={handleOpen}>
                            <EditIcon fontSize="small" backgroundColor="#FFFF" sx={{ color: "#ED6A15" }} />
                        </StyledButton2>
                        <StyledButton2 size="small" variant="outlined" onClick={handleSubmit}>
                            <StyledCircularBox>
                                <AddIcon fontSize="small" color="#FFFF" sx={{ color: "#FFFF" }} />
                            </StyledCircularBox>
                        </StyledButton2>
                    </Box>
                </MainBox>
            </StyledBox>
            <Stack mt={2} sx={{
                width: "100%",
                overflowX: { xs: "auto", sm: "visible" }
            }}>
                {dummyReviewData && Object?.keys(dummyReviewData)?.length > 0 ? (
                    // <TreeDataGrid columns={AllRowsColumns} density={"standard"} />
                    <TreeGrid columns={ReviewData} density={"standard"} data={dummyReviewData} sx={{
                        minWidth: { xs: "800px", sm: "100%" }
                    }} />
                ) : (
                    <MuiDataGrid columns={AllDaysColumns} rows={rows} density={"standard"}
                        sx={{
                            minWidth: { xs: "800px", sm: "100%" }
                        }} />
                )}
            </Stack>
            <SaveButton
                variant="outlined"
                color="error"
            >
                Save
            </SaveButton>

            <ButtonStack sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "flex-start",
                alignItems: { xs: "stretch", sm: "flex-start" },
                gap: { xs: "10px", sm: "20px" },
                width: "100%",
                marginTop: "1%"
            }} >
                <RejectButton
                    variant="contained"
                    color="error"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                    onClick={()=>handleReject()}
                >
                    Reject
                </RejectButton>
                <ApproveButton
                    variant="contained"
                    color="success"
                    sx={{ width: { xs: "100%", sm: "200px" } }}
                    onClick={()=>handleApprove()}
                >
                    Approve
                </ApproveButton>
            </ButtonStack>
            
      <Modal
        keepMounted
        open={openApproval}
        onClose={handleApprovalClose}
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
        <ApprovalBox >
          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", marginBottom: "5%" }}>
            <ModalTypography>
              Add Note
            </ModalTypography>
          </Box>
          <MuiInput
            rows={4}
            multiline={true}
          />
          <NoteButtonStack direction="row" spacing={3}>

            <CancelNoteButton id="keep-mounted-modal-title" variant="h6" component="h2" size="small" onClick={() => handleApprovalClose()}>
              <CancelNoteTypography>Cancel</CancelNoteTypography>
            </CancelNoteButton>
            <SaveNoteButton id="keep-mounted-modal-description" sx={{ mt: 2 }} size="small" onClick={handelSaveNote}>
              <SaveNoteTypography>Save</SaveNoteTypography>
            </SaveNoteButton>
          </NoteButtonStack>
        </ApprovalBox>
      </Modal>

        </StyledStack>
    );
};



export default ReviewScreen;
