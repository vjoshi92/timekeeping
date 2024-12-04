import { Box, Button, FormControl, styled, Typography } from '@mui/material';
import React, { useState } from 'react';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Dropdown from '../../components/Dropdown';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProjectData } from 'store/slice/CreateFormSlice';

const StyledTypography = styled(Typography)({
    color: "#0073E6",
    fontWeight: "500"
});

const StyledLabelTypography = styled(Typography)({
    fontWeight: "600",
    color: "#121212",
    marginBottom: "2%"
});

const StyledHeaderTypography = styled(Typography)({
    fontWeight: "700",
    fontSize: "16px",
});

const SaveTypography = styled(Typography)({
    fontWeight: "700",
    fontSize: "15px",
    color: "#FFFF"
});

const StyledBox = styled(Box)({
    backgroundColor: "#FBE1D0",
    color: "#121212",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginBottom: "2%",
    marginTop: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
        marginTop: "4%",
    },
    [theme.breakpoints.down("sm")]: {
        marginTop: "4%",
    },
    [theme.breakpoints.down("xl")]: {
        marginTop: "2%",
    },
    [theme.breakpoints.down("lg")]: {
        marginTop: "2%",
    },
}));

const StyledButton = styled(Button)({
    marginTop: "3%",
    backgroundColor: "#ED6A15",
});

const StyledDropdown = styled(Dropdown)(({ readOnly, backgroundColor }) => ({
    backgroundColor: backgroundColor || (readOnly ? "#F5F5F5" : "transparent"),
    marginBottom: "20%",
}));

const AddRowsScreen = () => {
    const projectedData = useSelector((state) => state?.CreateForm?.projectData);

    const dispatch = useDispatch()
    const [selectedLevels, setSelectedLevels] = useState({
        project: null,
        levelOne: null,
        levelTwo: null,
        levelThree: null,
        levelFour: null,
    });
    const navigate = useNavigate();
    const [projectDataArray, setProjectDataArray] = useState([]);

    const handleProjectData = () => {
        const levels = ['levelFour', 'levelThree', 'levelTwo', 'levelOne'];
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
            id: projectedData?.length,
            hierarchy: [selectedLevels.project, lastSelectedLevel],
        };
        
        const isDuplicate = projectedData.some(
            (item) =>
                item.project === data.project &&
                item.level === data.level
        );
    
        if (!isDuplicate) {
            let tData = [...projectedData];
            tData.push(data);
            dispatch(setProjectData(tData));
            navigate(-1);
        } else {
            console.log("Duplicate entry: Project and level already exist.");
        }
    };
    

    


    const ProjectData = [
        { id: 1, title: "Project1", value: "Project1" },
        { id: 2, title: "Project2", value: "Project2" },
        { id: 3, title: "Project3", value: "Project3" },
        { id: 4, title: "Project4", value: "Project4" },
        { id: 5, title: "Project5", value: "Project5" },
        { id: 6, title: "Project6", value: "Project6" },
    ];

    const LevelOneOptions = [
        { id: 1, title: "Option 1.1", value: "Option1.1" },
        { id: 2, title: "Option 2.1", value: "Option2.1" },
        { id: 3, title: "Option 3.1", value: "Option3.1" },
        { id: 4, title: "Option 4.1", value: "Option4.1" },
        { id: 5, title: "Option 5.1", value: "Option5.1" },
    ];
    const LevelTwoOptions = [
        { id: 1, title: "Level Two - Option 1", value: "LevelTwo_Option1" },
        { id: 2, title: "Level Two - Option 2", value: "LevelTwo_Option2" },
        { id: 3, title: "Level Two - Option 3", value: "LevelTwo_Option3" },
        { id: 4, title: "Level Two - Option 4", value: "LevelTwo_Option4" },
        { id: 5, title: "Level Two - Option 5", value: "LevelTwo_Option5" },
    ];

    const LevelThreeOptions = [
        { id: 1, title: "Level Three - Option 1", value: "LevelThree_Option1" },
        { id: 2, title: "Level Three - Option 2", value: "LevelThree_Option2" },
        { id: 3, title: "Level Three - Option 3", value: "LevelThree_Option3" },
        { id: 4, title: "Level Three - Option 4", value: "LevelThree_Option4" },
        { id: 5, title: "Level Three - Option 5", value: "LevelThree_Option5" },
    ];

    const LevelFourOptions = [
        { id: 1, title: "Level Four - Option 1", value: "LevelFour_Option1" },
        { id: 2, title: "Level Four - Option 2", value: "LevelFour_Option2" },
        { id: 3, title: "Level Four - Option 3", value: "LevelFour_Option3" },
        { id: 4, title: "Level Four - Option 4", value: "LevelFour_Option4" },
        { id: 5, title: "Level Four - Option 5", value: "LevelFour_Option5" },
    ];


    const handleChange = (level, value) => {
        setSelectedLevels((prevLevels) => ({
            ...prevLevels,
            [level]: value,
        }));
    };

    return (
        <Box padding={{ xs: 1, sm: 2 }}>
            <Button sx={{ marginBottom: "1.5%" }} startIcon={<ArrowBackIosNewIcon sx={{ color: "#0073E6" }} />} onClick={() => navigate(-1)}>
                <StyledTypography>Back</StyledTypography>
            </Button>
            <StyledBox p={2}>
                <StyledHeaderTypography>Add row to this timesheet</StyledHeaderTypography>
            </StyledBox>
            <StyledFormControl fullWidth>
                <StyledLabelTypography>Project</StyledLabelTypography>
                <StyledDropdown
                    name="project"
                    options={ProjectData.map(option => option?.title)}
                    onChange={(event, value) => handleChange('project', value)}
                    value={selectedLevels.project || "--"}
                />
            </StyledFormControl>

            {selectedLevels?.project && (
                <StyledFormControl fullWidth>
                    <StyledLabelTypography>Level 2</StyledLabelTypography>
                    <StyledDropdown
                        name="levelOne"
                        options={LevelOneOptions.map(option => option?.title)}
                        onChange={(event, value) => handleChange('levelOne', value)}
                        value={selectedLevels.levelOne || "--"}
                    />
                </StyledFormControl>
            )}
            {selectedLevels?.levelOne && (
                <StyledFormControl fullWidth>
                    <StyledLabelTypography>Level 3</StyledLabelTypography>
                    <StyledDropdown
                        name="levelTwo"
                        options={LevelTwoOptions.map(option => option?.title)}
                        onChange={(event, value) => handleChange('levelTwo', value)}
                        value={selectedLevels.levelTwo || "--"}
                    />
                </StyledFormControl>
            )}
            {selectedLevels?.levelTwo && (
                <StyledFormControl fullWidth>
                    <StyledLabelTypography>Level 4</StyledLabelTypography>
                    <StyledDropdown
                        name="levelThree"
                        options={LevelThreeOptions.map(option => option?.title)}
                        onChange={(event, value) => handleChange('levelThree', value)}
                        value={selectedLevels.levelThree || "--"}
                    />
                </StyledFormControl>
            )}
            {selectedLevels?.levelThree && (
                <StyledFormControl fullWidth>
                    <StyledLabelTypography>Level 5</StyledLabelTypography>
                    <StyledDropdown
                        name="levelFour"
                        options={LevelFourOptions.map(option => option?.title)}
                        onChange={(event, value) => handleChange('levelFour', value)}
                        value={selectedLevels.levelFour || "--"}
                    />
                </StyledFormControl>
            )}
            {selectedLevels?.project && (
                <StyledButton onClick={handleProjectData}>
                    <SaveTypography>
                        Add Rows
                    </SaveTypography>
                </StyledButton>
            )}
        </Box>
    );
};

export default AddRowsScreen;
