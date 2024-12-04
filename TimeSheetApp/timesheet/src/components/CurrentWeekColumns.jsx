import React from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MuiInput from './MuiInput';
import dayjs from 'dayjs';

const BoldMuiInput = styled(MuiInput)({
    fontWeight: 700,
});

export const DaysColumns = ({ handleInputChange, handleDelete, isEdit, selectedDate }) => {
    const getWeekDays = () => {
        let startDate;
        
        if (Array.isArray(selectedDate) && selectedDate.length === 0) {
            startDate = dayjs().startOf('week').add(1, 'day');
        } else if (selectedDate) {
            const [startDateStr] = selectedDate.split(' - ');
            startDate = dayjs(startDateStr, 'DD MMM YY');
        } else {
            startDate = dayjs().startOf('week').add(1, 'day');
        }
    
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = dayjs(startDate).add(i, 'day');
            const isToday = currentDate.isSame(dayjs(), 'date');
    
            weekDays.push({
                field: `day${i}`,
                headerName: currentDate.format('ddd'),
                flex: 1,
                minWidth: 120,
                renderHeader: () => (
                    <Box
                        sx={{
                            width:"50px",
                            textAlign: 'center',       
                            borderBottom: isToday ? '4px solid #ED6A15' : 'none',
                        }}
                    >
                        <Box sx={{ fontWeight: 'bold' }}>
                            {currentDate.format('ddd')}
                        </Box>
                        <Box sx={{ fontWeight: 'lighter', fontSize: '0.85em' }}>
                            {currentDate.format('DD MMM')}
                        </Box>
                    </Box>
                ),
                renderCell: (params) => (
                    // <MuiInput
                    //     type={'number'}
                    //     onChange={(value) => handleInputChange(`day${i}`, value, params?.row?.id)}
                    //     value={params?.value || 0}
                    // />
                    <Typography sx={{fontWeight:"700" , marginTop:"10px"}}>0</Typography>
                ),
            });
        }
        return weekDays;
    };

    const weekDayColumns = getWeekDays();

    const columns = [

        {
            field: "data",
            headerName: "",
            flex: 1,
            fontWeight: "700",
            minWidth: 170,
            renderCell: (params) => (
                // <MuiInput
                //     disabled={true}
                //     onChange={(value) => {
                //         handleInputChange('Zkstar', value, params?.row?.id);
                //     }}
                //     value="Total"
                //     style={{ fontWeight: 'bold' }}
                    
                // />
                <Typography sx={{fontWeight:"700" , marginTop:"10px"}}>Total</Typography>
            ),
        },
        ...weekDayColumns,
        {
            field: "Actions",
            headerName: "ACTIONS",
            flex: 0.5,
            minWidth: 110,
            renderCell: (params) => (
                <>
                    <IconButton
                        size="small"
                        sx={{ marginBottom: "10px" }}
                        color="#ED6A15"
                        onClick={() => handleDelete(params?.row?.id)}
                    >
                        <TextSnippetIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{ marginBottom: "10px" }}
                        color="secondary"
                        onClick={() => handleDelete(params?.row?.id)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return columns;
};