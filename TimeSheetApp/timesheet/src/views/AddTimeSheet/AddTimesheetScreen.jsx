import {
  Alert,
  Box,
  Button,
  FormControl,
  ListItem,
  ListItemText,
  Snackbar,
  styled,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData, setStatus } from "store/slice/TimesheetSlice";
import TitleDropdown from "components/TitleDropdown";
import {
  useGetProjectDataQuery,
  useGetWbsDataQuery,
  useMakeBatchCallMutation,
} from "api/timesheetApi";

const StyledTypography = styled(Typography)({
  color: "#0073E6",
  fontWeight: "500",
});

const StyledLabelTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "600",
  color: "#121212",
  marginBottom: theme.spacing(2),
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
}));

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
}));

const SaveTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "700",
  fontSize: {
    xs: "14px",
    sm: "15px",
  },
  color: "#FFFF",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FBE1D0",
  color: "#121212",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: "#ED6A15",
  width: {
    xs: "100%",
    sm: "auto",
  },
  padding: theme.spacing(1, 3),
  "&:hover": {
    backgroundColor: "#d55f13",
  },
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

const ProjectData = [
  { id: 1, title: "JMA NOFO 2 O-RU", value: "JMA NOFO 2 O-RU" },
  { id: 2, title: "Indirect", value: "Indirect" },
  { id: 3, title: "Other Direct", value: "Other Direct" },
];

const LevelOneOptions = [
  {
    id: 1,
    project: "JMA NOFO 2 O-RU",
    title: "1.4.10.2.1",
    value: "Mechanical Design",
  },
  {
    id: 2,
    project: "JMA NOFO 2 O-RU",
    title: "1.4.10.2.2",
    value: "Board Design",
  },
  {
    id: 3,
    project: "JMA NOFO 2 O-RU",
    title: "1.4.10.2.3",
    value: "PCB Design",
  },
  { id: 4, project: "Indirect", title: "1.1", value: "General Training" },
  { id: 5, project: "Indirect", title: "1.2", value: "Holiday" },
  { id: 6, project: "Indirect", title: "1.3", value: "PTO" },
  { id: 7, project: "Indirect", title: "1.4", value: "Available" },
  { id: 8, project: "Other Direct", title: "1.1", value: "Other Projects" },
];

const AddRowsScreen = () => {
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const dispatch = useDispatch();
  const [selectedLevels, setSelectedLevels] = useState({
    project: null,
    levelOne: null,
    levelOneTitle: null,
  });
  const [levels, setLevels] = useState([]);
  const navigate = useNavigate();
  const [projectDataArray, setProjectDataArray] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addProjectOpen, setAddProjectOpen] = useState(false);

  // console.log("levels", levels)

  const { data: wbsData } = useGetWbsDataQuery();
  const { data: projectAllData } = useGetProjectDataQuery();
  const [
    makeBatchCall,
    { isSucess: batchCallIsSuccess, error: batchCallIsError },
  ] = useMakeBatchCallMutation();

  const createBatchPayload = (personnelNumber) => {
    const timeEntryData = {
      __metadata: {
        type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
      },
      TimeEntryDataFields: {
        __metadata: {
          type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
        },
        AWART: "0800",
        LSTAR: "",
        ALLDF: "",
        PRAKN: "",
        PRAKZ: "0000",
        BEMOT: "",
        CATSHOURS: "5.00",
        PERNR: "09000993",
        KOKRS: "PPC",
        CPR_EXTID: "",
        CPR_GUID: "",
        CPR_OBJGEXTID: "",
        CPR_OBJGUID: "",
        CPR_OBJTYPE: "",
        WAERS: "",
        ENDUZ: "000000",
        EXTAPPLICATION: "",
        EXTDOCUMENTNO: "",
        AUFKZ: "",
        EXTSYSTEM: "",
        PEDD: null,
        AUERU: "",
        FUNC_AREA: "",
        FUND: "",
        GRANT_NBR: "",
        LONGTEXT: "",
        RNPLNR: "",
        VERSL: "",
        ERUZU: "",
        TRFGR: "",
        TRFST: "",
        WERKS: "",
        SEBELP: "00000",
        SEBELN: "",
        PLANS: "00000000",
        VTKEN: "",
        CATSQUANTITY: "5.00",
        RKOSTL: "",
        RAUFNR: "",
        RPRZNR: "",
        RKSTR: "",
        RKDPOS: "000000",
        RKDAUF: "",
        OFMNW: "0.0",
        SPRZNR: "",
        SKOSTL: "",
        S_FUNC_AREA: "",
        S_FUND: "",
        S_GRANT_NBR: "",
        LSTNR: "",
        LTXA1: "",
        SPLIT: "000",
        BEGUZ: "000000",
        STATKEYFIG: "",
        TCURR: "",
        REINR: "0000000000",
        MEINH: "H",
        UNIT: "H",
        LGART: "",
        WORKDATE: "2025-01-13T00:00:00",
        WTART: "",
        CATSAMOUNT: "0.00",
        PRICE: "0.00",
        RPROJ: "00000000",
        ARBPL: "",
        TASKTYPE: "",
        TASKLEVEL: "",
        TASKCOMPONENT: "",
        VORNR: "",
        UVORN: "",
        KAPAR: "",
        BWGRL: "0.00",
        LONGTEXT_DATA: "Test from React",
        WORKITEMID: "000000000000",
        POSID: "NOF-0003.002",
        RAUFPL: "0000000000",
        RAPLZL: "00000000",
        PAOBJNR: "0000000000",
        BUDGET_PD: "",
        SBUDGET_PD: "",
        KAPID: "00000000",
        WABLNR: "",
        OTYPE: "",
        ARBID: "00000000",
        AUTYP: "00",
        HRCOSTASG: "0",
        HRKOSTL: "",
        HRLSTAR: "",
        HRFUND: "",
        HRFUNC_AREA: "",
        HRGRANT_NBR: "",
        BUKRS: "",
        HRBUDGET_PD: "",
        ERNAM: "TEST_APP2",
        AENAM: "TEST_APP2",
        APNAM: "",
        LOGSYS: "JMDCLNT100",
        STATUS: "",
        REFCOUNTER: "",
        REASON: "",
        BELNR: "",
        TASKCOUNTER: "",
        BEDID: "000000000000",
        KTEXT: "",
        ZLTXA1: "",
      },
      Pernr: "09000993",
      Counter: "000000005668",
      RejReason: "",
      RejReasondesc: "",
      Status: "",
      RefCounter: "",
      CatsDocNo: "",
      TimeEntryOperation: "U",
      CheckOnly: "",
      AllowRelease: "X",
      AllowEdit: "",
      AssignmentId: "0.0000000 ",
      AssignmentName: "",
      RecRowNo: "1",
      ApproverId: "00000000",
      ApproverName: "",
      ErrorMsg: "",
      Message1: "",
      Message1Type: "",
      Message2: "",
      Message2Type: "",
      Message3: "",
      Message3Type: "",
      CustomMessage: "",
      CustomMessageType: "",
      CustomMessage1: "",
      CustomMessage1Type: "",
      CustomMessage2: "",
      CustomMessage2Type: "",
      MessageClass1: "",
      MessageNumber1: "",
      MessageClass2: "",
      MessageNumber2: "",
      MessageClass3: "",
      MessageNumber3: "",
      ErrorMessageClass: "",
      ErrorMessageType: "",
    };

    const batchPayload = [
      "--batch",
      "Content-Type: multipart/mixed; boundary=changeset",
      "",
      "--changeset",
      "Content-Type: application/http",
      "Content-Transfer-Encoding: binary",
      "",
      "POST TimeEntryCollection?sap-client=100 HTTP/1.1",
      "Content-Type: application/json",
      "",
      JSON.stringify(timeEntryData, null, 2),
      "--changeset--",
      "",
      "--batch--",
    ].join("\n");

    return batchPayload;
  };

  const handleBatchCall = async () => {
    try {
      const bodyPayload = createBatchPayload();
      const response = await makeBatchCall({ body: bodyPayload });
      console.log("Batch call successful:", response);
    } catch (error) {
      console.error("Error making batch call:", error);
      // Handle specific error types if needed
      if (error.name === "FetchError") {
        // Handle network errors
        console.error("Network error occurred");
      }
    }
  };
  // Move the success handling to useEffect
  useEffect(() => {
    if (batchCallIsSuccess) {
      console.log("batch success");
      // Add any success handling logic here
    }
    if (batchCallIsError) {
      console.error("Batch call failed:", batchCallIsError);
      // Add any error handling logic here
    }
  }, [batchCallIsSuccess, batchCallIsError]);

  const handleProjectData = () => {
    const levels = ["levelOne"];
    let lastSelectedLevel = null;
    let lastSelectedTitle = null;
    for (const level of levels) {
      if (selectedLevels[level]) {
        lastSelectedLevel = selectedLevels[level];
        lastSelectedTitle = selectedLevels.levelOneTitle;
        break;
      }
    }
    const data = {
      day0: "",
      day1: "",
      day2: "",
      day3: "",
      day4: "",
      day5: "",
      day6: "",
      project: selectedLevels.project || "",
      level: lastSelectedLevel,
      title: lastSelectedTitle,
      weekTotal: "0.00",
      id: Math.random(),
      hierarchy: [
        selectedLevels.project,
        `${lastSelectedTitle}\n${lastSelectedLevel}`,
      ],
    };

    // console.log("data", data)
    const isDuplicate = projectedData.some(
      (item) => item.project === data.project && item.level === data.level
    );

    if (!isDuplicate) {
      let tData = [...projectedData];
      if (tData && tData.length === 0) {
        tData.push(data);
        tData.push({
          day0: "0.00",
          day1: "0.00",
          day2: "0.00",
          day3: "0.00",
          day4: "0.00",
          day5: "0.00",
          day6: "0.00",
          weekTotal: "0.00",
          project: "",
          level: "Total",
          title: "",
          id: Math.random(),
          hierarchy: ["Total"],
          totalRow: true,
        });
      } else {
        tData.unshift(data);
      }
      dispatch(setProjectData(tData));

      setAddProjectOpen(true);
      navigate(-1);
    } else {
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleProjectClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAddProjectOpen(false);
  };

  const handleChange = (level, value) => {
    if (level === "project") {
      // When project is selected, find the matching PSPID from the selected POSID_DESC
      const selectedProject = wbsData?.results?.find(
        (item) => item.POSID_DESC === value
      );

      // Filter projectAllData based on matching PSPID
      const filteredLevels = projectAllData?.results?.filter(
        (x) => x?.PSPID === selectedProject?.PSPID
      );

      setLevels(filteredLevels);
      setSelectedLevels((prevLevels) => ({
        ...prevLevels,
        [level]: value,
      }));
    } else {
      setSelectedLevels((prevLevels) => ({
        ...prevLevels,
        [level]: value?.value,
        [`${level}Title`]: value?.label,
      }));
    }
  };

  return (
    <Box
      sx={{
        padding: {
          xs: 2,
          sm: 3,
          md: 4,
        },
        maxWidth: "800px",
        margin: "0 auto",
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

      <StyledBox>
        <StyledHeaderTypography>
          Add row to this timesheet
        </StyledHeaderTypography>
      </StyledBox>

      <StyledFormControl>
        <StyledLabelTypography>Select Project</StyledLabelTypography>
        <StyledDropdown
          name="project"
          options={wbsData?.results?.map((option) => option?.POSID_DESC)}
          onChange={(event, value) => handleChange("project", value)}
          value={selectedLevels.project || "--"}
        />
      </StyledFormControl>

      {/* <StyledDropdown
    name="project"
    options={
      wbsData?.results
        ?.map((item) => item.POSID_DESC) // Map over POSID_DESC
        ?.filter(Boolean) // Remove any undefined/null values
    }
    onChange={(event, value) => handleChange("project", value)}
    value={selectedLevels.project || "--"}
  /> */}

      {selectedLevels?.project && (
        <StyledFormControl>
          <StyledLabelTypography>Enter WBS Code or Task</StyledLabelTypography>
          <TitleDropdown
            name="levelOne"
            options={levels?.map((option) => ({
              label: option?.PSPID,
              value: option?.PSPID_DESC,
            }))}
            onChange={(event, value) => handleChange("levelOne", value)}
            value={
              selectedLevels.levelOne
                ? `${selectedLevels.levelOneTitle} - ${selectedLevels.levelOne}`
                : null
            }
          />
        </StyledFormControl>
      )}

      {selectedLevels?.levelOne && (
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "stretch", sm: "flex-start" },
          }}
        >
          <StyledButton onClick={handleProjectData}>
            <SaveTypography>Save</SaveTypography>
          </StyledButton>
          <StyledButton onClick={handleBatchCall}>
            <SaveTypography>Post Save</SaveTypography>
          </StyledButton>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Project already added with the selected task
        </Alert>
      </Snackbar>
      <Snackbar
        open={addProjectOpen}
        autoHideDuration={3000}
        onClose={handleProjectClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleProjectClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Added Project Sucessfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddRowsScreen;
