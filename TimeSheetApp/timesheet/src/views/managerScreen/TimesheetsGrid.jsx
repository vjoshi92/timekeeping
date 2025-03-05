import { Autocomplete, Box, Button, Typography } from '@mui/material';
import ApprovalsDatagrid from 'views/managerScreen/ApprovalsDatagrid';
import EmployeeSearch from 'components/EmployeeSearch';
import TimeSheetsDatagrid from 'components/TimeSheetsDatagrid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';


const MainBox = styled(Box)(({ theme }) => ({
    display: "flex", flexDirection: "row", justifyContent: "space-between"
}));


const SubBox = styled(Box)(({ theme }) => ({
    marginTop: "20px"
}));

const OuterBox = styled(Box)(({ theme }) => ({
    padding: "40px"
}));

const TimesheetsGrid = () => {
    const { isManager } = useParams();
    const [searchQuery, setSearchQuery] = useState("");
    const onSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <OuterBox >
            <MainBox>
                <Typography sx={{ fontSize: "22px", fontWeight: 700 }}>
                    {isManager === "true" ? "My Team's Timesheets" : "My Timesheets"}
                </Typography>

                {/* {isManager === "true" ? <EmployeeSearch onSearch={onSearch} /> : null} */}
            </MainBox>
            <SubBox >
                <TimeSheetsDatagrid searchQuery={searchQuery} />
            </SubBox>
        </OuterBox>
    );
};

export default TimesheetsGrid;
