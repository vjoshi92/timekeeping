import { Autocomplete, Box, Button, Typography } from '@mui/material'
import ApprovalsDatagrid from 'components/ApprovalsDatagrid'
import EmployeeSearch from 'components/EmployeeSearch'
import TimeSheetsDatagrid from 'components/TimeSheetsDatagrid'
import React from 'react'

const TimesheetsGrid = () => {
    return (
        <Box sx={{ padding: "40px" }} >
            <Box sx={{display:"flex", flexDirection:"row" , justifyContent:"space-between"}}>
            <Typography sx={{ fontSize: "22px", fontWeight: 700 }}>
                My Team's Timesheets
            </Typography>
            <EmployeeSearch/>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
                <TimeSheetsDatagrid />
            </Box>
        </Box>
    )
}

export default TimesheetsGrid