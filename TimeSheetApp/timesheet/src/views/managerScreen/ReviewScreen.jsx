import React, { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, Divider, Fade, IconButton, Modal, Popper, Snackbar, Stack, ToggleButton, Typography } from "@mui/material";
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
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { DaysColumns } from "components/CurrentWeekColumns";
import { RowsDataColumns } from "components/RowsDataColumn";
import TreeGrid from "components/TreeGrid";
import MuiInput from "components/MuiInput";
import { useLocation } from 'react-router-dom';
import { ReviewColumns } from "components/ReviewColumns";
import { ArrowBackIosNew } from "@mui/icons-material";
import { setDateRange } from "store/slice/HomeSlice";
import { setProjectData } from "store/slice/TimesheetSlice";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Dropdown from "components/Dropdown";
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

const StyledTypography = styled(Typography)({
    color: "#0073E6",
    fontWeight: "500"
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
    padding: "20px"
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
    padding: "20px"
}));

const RejectionMainBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5%"
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: 2,
    top: -30,
    color: "#fff",
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
    height: "42px"
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
    height: "42px"
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
    fontSize: "14px",
    marginBottom: "3%"
}));

const HeaderBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: { xs: "flex-start", sm: "center" },
    padding: { xs: "10px", sm: "0" }
}));

const NoteButtonStack = styled(Stack)(({ theme }) => ({
    width: "100%",
    direction: "row",
    display: "flex",
    justifyContent: "center",
    marginTop: "4%"
}));

const RejectButtonStack = styled(Stack)(({ theme }) => ({
    width: "100%",
    direction: "row",
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "4%"
}));

const DescriptionTypography = styled(Typography)(({ theme }) => ({
    color: "#121212DE",
    fontWeight: "400",
    fontSize: "16px"
}));

const StyledDropdown = styled(Dropdown)(({ readOnly, backgroundColor, theme }) => ({
    backgroundColor: backgroundColor || (readOnly ? "#F5F5F5" : "transparent"),
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        fontSize: '14px'
    }
}));

const ReviewScreen = () => {
    const { state } = useLocation();
    const { data } = state || {};
    const [alignment, setAlignment] = React.useState("left");
    const [value, setValue] = React.useState([null, null]);
    const selectedDate = useSelector((state) => state?.home?.daterange);
    const [open, setOpen] = React.useState(false);
    const [openApproval, setOpenApproval] = React.useState(false);
    const [openRejection, setOpenRejection] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleApproval = () => setOpenApproval(true);
    const handleRejection = () => setOpenRejection(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const handelSaveNote = () => {
        setOpenApproval(false)
        setSnackbarOpen(true)
        navigate(-1)
    };
    const handleClose = () => setOpen(false);
    const handleApprovalClose = () => setOpenRejection(false);
    const navigate = useNavigate();
    const projectedData = useSelector((state) => state?.CreateForm?.projectData);
    const [currentDateRange, setCurrentDateRange] = useState(selectedDate || formattedDateRange);
    const dispatch = useDispatch()
    const { isReviewer } = useParams();
    const [selectedReason, setSelectedReason] = useState(""); // Add this new state

    const ProjectData = [
        { id: 1, title: "Incorrect Time Entry" },
        { id: 2, title: "Incorrect Charge Code" },
        { id: 3, title: "Other" },
    ];

    const handleReasonChange = (event, value) => {
        setSelectedReason(value);
    };


    if (!data) {
        return <div>No data available</div>;
    }

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    const handlePreviousWeek = () => {
        let currentStartDate;

        if (!selectedDate || selectedDate.length === 0) {
            currentStartDate = dayjs().startOf('week').add(1, 'day');
        } else {
            try {
                if (typeof selectedDate === 'string') {
                    const startDateStr = selectedDate.split(' - ')[0];
                    currentStartDate = dayjs(startDateStr, 'DD MMM YYYY');
                } else {
                    currentStartDate = dayjs().startOf('week').add(1, 'day');
                }
            } catch (error) {
                currentStartDate = dayjs().startOf('week').add(1, 'day');
            }
        }
        const startOfPreviousWeek = currentStartDate.subtract(7, 'day');
        const endOfPreviousWeek = startOfPreviousWeek.add(6, 'day');
        const newDateRange = `${startOfPreviousWeek.format('DD MMM YYYY')} - ${endOfPreviousWeek.format('DD MMM YYYY')}`;
        dispatch(setDateRange(newDateRange));
    };

    const handleNextWeek = () => {
        let currentStartDate;
        if (!selectedDate || selectedDate.length === 0) {
            currentStartDate = dayjs().startOf('week').add(1, 'day');
        } else {
            try {
                if (typeof selectedDate === 'string') {
                    const startDateStr = selectedDate.split(' - ')[0];
                    currentStartDate = dayjs(startDateStr, 'DD MMM YYYY');
                } else {
                    currentStartDate = dayjs().startOf('week').add(1, 'day');
                }
            } catch (error) {
                currentStartDate = dayjs().startOf('week').add(1, 'day');
            }
        }
        const startOfNextWeek = currentStartDate.add(7, 'day');
        const endOfNextWeek = startOfNextWeek.add(6, 'day');
        const newDateRange = `${startOfNextWeek.format('DD MMM YYYY')} - ${endOfNextWeek.format('DD MMM YYYY')}`;
        dispatch(setDateRange(newDateRange));
    };


    const handleSubmit = () => {
        navigate("/addRows")
    }

    const handleApprove = () => {

    }

    const handleReject = () => {

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
        dispatch(setProjectData(tempRows));
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
    const formattedDateRange = `${startOfCurrentWeek.format('DD MMM YYYY')} - ${endOfCurrentWeek.format('DD MMM YYYY')}`;

    return (
        <StyledStack
            padding={{ xs: 1, sm: 1 }}
            // height={{ xs: "auto", sm: "90vh", md: "90vh", lg: "90vh" }}
            paddingX={{ xs: 2, sm: 10 }}

        >
            <HeaderBox
                sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: { xs: 2, sm: 0 }
                }}
            >
                <Button
                    sx={{
                        marginBottom: { xs: 2, sm: 3 },
                        padding: { xs: 1, sm: 1.5 }
                    }}
                    startIcon={<ArrowBackIosNewIcon sx={{ color: "#0073E6" }} />}
                    onClick={() => navigate(-1)}
                >
                    <StyledTypography>Back</StyledTypography>
                </Button>
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
                        >
                            <ToggleButton value="left" aria-label="left aligned" onClick={() => handlePreviousWeek()}>
                                <ArrowBackIcon />
                            </ToggleButton>
                            <ToggleButton value="justify" aria-label="justified" onClick={() => handleNextWeek()}>
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
            <Stack mt={2} mb={4} sx={{
                width: "100%",
                overflowX: { xs: "auto", sm: "visible" }
            }}>
                {dummyReviewData && Object?.keys(dummyReviewData)?.length > 0 ? (
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
            {/* {
                isReviewer == "true" ? <SaveButton
                    variant="outlined"
                    color="error"
                >
                    Save
                </SaveButton> : null
            } */}

            {
                isReviewer == "true" ? <ButtonStack sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "flex-start",
                    alignItems: { xs: "stretch", sm: "flex-start" },
                    gap: { xs: "10px", sm: "20px" },
                    width: "100%",
                    marginTop: "1%",
                    marginBottom: "5%"
                }} >
                    <ReworkButton
                        variant="contained"
                        color="error"
                    >
                        Release Timesheet
                    </ReworkButton>
                    <RejectButton
                        variant="contained"
                        color="error"
                        sx={{ width: { xs: "100%", sm: "200px" } }}
                        onClick={() => handleRejection()}
                    >
                        Reject
                    </RejectButton>
                    <ApproveButton
                        variant="contained"
                        color="success"
                        sx={{ width: { xs: "100%", sm: "200px" } }}
                        onClick={() => handleApproval()}
                    >
                        Approve
                    </ApproveButton>
                </ButtonStack> : null
            }

            <Modal
                keepMounted
                open={openRejection}
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
                <RejectionBox>
                    <RejectionMainBox>
                        <ModalTypography>
                            Rejection Reasons
                        </ModalTypography>
                        <StyledDropdown
                            name="project"
                            options={ProjectData.map(option => option?.title)}
                            onChange={handleReasonChange}
                            value={selectedReason || "--"}
                        />
                    </RejectionMainBox>
                    {selectedReason === "Other" && (
                        <MuiInput
                            rows={2}
                            multiline={true}
                            placeholder="Please specify the reason"
                            sx={{ width: "100%", marginTop: "20px" }}
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
                    <StyledIconButton
                        onClick={handelSaveNote}
                    >
                        <CloseIcon />
                    </StyledIconButton>

                    <DescriptionTypography>
                        Are you sure you want to approve this timesheet?
                    </DescriptionTypography>
                    <NoteButtonStack direction="row" spacing={3}>
                        <CancelNoteButton id="keep-mounted-modal-title" variant="h6" component="h2" size="small" onClick={handelSaveNote}>
                            <CancelNoteTypography>No</CancelNoteTypography>
                        </CancelNoteButton>
                        <SaveNoteButton id="keep-mounted-modal-description" sx={{ mt: 2 }} size="small" onClick={handelSaveNote}>
                            <SaveNoteTypography>Yes</SaveNoteTypography>
                        </SaveNoteButton>
                    </NoteButtonStack>
                </ApprovalBox>
            </Modal>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    Timesheet Approved Sucessfully !
                </Alert>
            </Snackbar>
        </StyledStack>
    );
};



export default ReviewScreen;
