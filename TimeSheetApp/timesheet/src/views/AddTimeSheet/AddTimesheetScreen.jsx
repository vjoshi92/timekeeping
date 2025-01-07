import { Box, Button, FormControl, ListItem, ListItemText, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Dropdown from '../../components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectData } from 'store/slice/TimesheetSlice';
import TitleDropdown from 'components/TitleDropdown';

const StyledTypography = styled(Typography)({
    color: "#0073E6",
    fontWeight: "500"
});

const StyledLabelTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "600",
    color: "#121212",
    marginBottom: theme.spacing(2),
    fontSize: {
        xs: '14px',
        sm: '16px'
    }
}));

const StyledHeaderTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "700",
    fontSize: {
        xs: '14px',
        sm: '16px'
    }
}));

const SaveTypography = styled(Typography)(({ theme }) => ({
    fontWeight: "700",
    fontSize: {
        xs: '14px',
        sm: '15px'
    },
    color: "#FFFF"
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: "#FBE1D0",
    color: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),
    margin: theme.spacing(2, 0),
    borderRadius: theme.shape.borderRadius
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(1),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        marginTop: theme.spacing(2),
    }
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(3),
    backgroundColor: "#ED6A15",
    width: {
        xs: '100%',
        sm: 'auto'
    },
    padding: theme.spacing(1, 3),
    '&:hover': {
        backgroundColor: "#d55f13"
    }
}));

const StyledDropdown = styled(Dropdown)(({ readOnly, backgroundColor, theme }) => ({
    backgroundColor: backgroundColor || (readOnly ? "#F5F5F5" : "transparent"),
    marginBottom: theme.spacing(2),
    width: "100%",
    [theme.breakpoints.down("sm")]: {
        fontSize: '14px'
    }
}));

const AddRowsScreen = () => {
    const projectedData = useSelector((state) => state?.CreateForm?.projectData);
    const dispatch = useDispatch()
    const [selectedLevels, setSelectedLevels] = useState({
        project: null,
        levelOne: null,
    });
    const navigate = useNavigate();
    const [projectDataArray, setProjectDataArray] = useState([]);

    const handleProjectData = () => {
        const levels = ['levelOne'];
        let lastSelectedLevel = null;
        for (const level of levels) {
            if (selectedLevels[level]) {
                lastSelectedLevel = selectedLevels[level];
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
            title: selectedLevels.title,
            id: Math.random(),
            hierarchy: [selectedLevels.project, lastSelectedLevel],
        };

        const isDuplicate = projectedData.some(
            (item) =>
                item.project === data.project &&
                item.level === data.level
        );

        if (!isDuplicate) {
            let tData = [...projectedData];
            if (tData && tData.length === 0) {

                tData.push(data);
                tData.push({
                    day1: 0, day2: 0, day3: 0, day4: 0, day5: 0, day6: 0, day7: 0,
                    project: "",
                    level: 0,
                    title: '',
                    id: Math.random(),
                    hierarchy: []
                })
            } else {
                tData.unshift(data);
            }
            dispatch(setProjectData(tData));
            navigate(-1);
        } else {
            console.log("Duplicate entry: Project and level already exist.");
        }
    };

    const ProjectData = [
        { id: 1, title: "JMA NOFO 2 SRFA 1", value: "JMA NOFO 2 SRFA 1" },
        { id: 2, title: "Indirect", value: "Indirect" },
        { id: 3, title: "Other Direct", value: "Other Direct" },
    ];

    const LevelOneOptions = [
        { id: 1, title: "NOF-1.4.8.1.1", value: "Detailed Mechanical Design" },
        { id: 2, title: "NOF-1.4.8.1.1", value: "Detailed Mechanical Design" },
        { id: 3, title: "NOF-1.5.1.1.1", value: "Mechanical Kit Design" },
    ];

    const handleChange = (level, value, label) => {
        setSelectedLevels((prevLevels) => ({
            ...prevLevels,
            [level]: value,
            title: label
        }));
    };

    return (
        <Box sx={{
            padding: {
                xs: 2,
                sm: 3,
                md: 4
            },
            maxWidth: '800px',
            margin: '0 auto'
        }}>
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

            <StyledBox>
                <StyledHeaderTypography>Add row to this timesheet</StyledHeaderTypography>
            </StyledBox>

            <StyledFormControl>
                <StyledLabelTypography>Select Project</StyledLabelTypography>
                <StyledDropdown
                    name="project"
                    options={ProjectData.map(option => option?.title)}
                    onChange={(event, value) => handleChange('project', value)}
                    value={selectedLevels.project || "--"}
                />
            </StyledFormControl>

            {selectedLevels?.project && (
                <StyledFormControl>
                    <StyledLabelTypography>Enter WBS Code or Task</StyledLabelTypography>
                    <TitleDropdown
                        name="levelOne"
                        options={LevelOneOptions.map((option) => ({
                            label: `${option.title}`,
                            value: option.value,
                        }))}
                        onChange={(event, value) => handleChange('levelOne', value?.value, value.label)}
                        value={selectedLevels.levelOne || null}
                    />
                </StyledFormControl>
            )}

            {selectedLevels?.levelOne && (
                <Box sx={{
                    display: 'flex',
                    justifyContent: { xs: 'stretch', sm: 'flex-start' }
                }}>
                    <StyledButton onClick={handleProjectData}>
                        <SaveTypography>Save</SaveTypography>
                    </StyledButton>
                </Box>
            )}
        </Box>
    );
};

export default AddRowsScreen;