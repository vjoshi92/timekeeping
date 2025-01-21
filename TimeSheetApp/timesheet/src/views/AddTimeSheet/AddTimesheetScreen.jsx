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
import React, { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProjectData, setStatus } from "store/slice/TimesheetSlice";
import TitleDropdown from "components/TitleDropdown";
import { useGetWbsDataQuery } from "api/timesheetApi";

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

  const {data : wbsData} = useGetWbsDataQuery()

  console.log("wbsData" , wbsData)

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

  const handleChange = (level, value, title) => {
    if (level == "project") {
      const filteredLevels = LevelOneOptions.filter((x) => x.project === value);
      setLevels(filteredLevels);
    }
    setSelectedLevels((prevLevels) => ({
      ...prevLevels,
      [level]: value,
      [`${level}Title`]: title,
    }));
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
          options={ProjectData.map((option) => option?.title)}
          onChange={(event, value) => handleChange("project", value)}
          value={selectedLevels.project || "--"}
        />
      </StyledFormControl>

      {selectedLevels?.project && (
        <StyledFormControl>
          <StyledLabelTypography>Enter WBS Code or Task</StyledLabelTypography>
          <TitleDropdown
            name="levelOne"
            options={levels.map((option) => ({
              label: `${option.title}`,
              value: option.value,
            }))}
            onChange={(event, value) =>
              handleChange("levelOne", value?.value, value.label)
            }
            value={selectedLevels.levelOne ? `${selectedLevels.levelOneTitle} - ${selectedLevels.levelOne}` : null}
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
