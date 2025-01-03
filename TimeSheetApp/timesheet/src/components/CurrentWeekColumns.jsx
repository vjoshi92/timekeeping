import React from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MuiInput from './MuiInput';
import dayjs from 'dayjs';

const StyledTypography = styled(Typography)({
   fontWeight:"700" , 
   marginTop:"10px"
});

// const StyledBox = styled(Box)({
//     width:"50px",
//     textAlign: 'center',    
// });

const StyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: "100%",
}));

const StyledIconButton = styled(IconButton)({
    marginBottom: "10px" 
});

export const DaysColumns = ({ handleInputChange, handleDelete, isEdit, selectedDate }) => {
    const getWeekDays = () => {
        let startDate;
        
        if (Array.isArray(selectedDate) && selectedDate.length === 0) {
            startDate = dayjs().startOf('week').add(1, 'day');
        } else if (selectedDate) {
            const [startDateStr] = selectedDate?.split(' - ');
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
                    <StyledBox
                        sx={{                            
                            borderBottom: isToday ? '4px solid #ED6A15' : 'none',
                        }}
                    >
                        <Box sx={{ fontWeight: 'bold' }}>
                            {currentDate.format('ddd')}
                        </Box>
                        <Box sx={{ fontWeight: 'lighter', fontSize: '0.85em' }}>
                            {currentDate.format('DD MMM')}
                        </Box>
                    </StyledBox>
                ),
                renderCell: (params) => (
                    // <MuiInput
                    //     type={'number'}
                    //     onChange={(value) => handleInputChange(`day${i}`, value, params?.row?.id)}
                    //     value={params?.value || 0}
                    // />
                    <StyledTypography >0</StyledTypography>
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
                <StyledTypography>Total</StyledTypography>
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
                    <StyledIconButton
                        size="small"
                        color="#ED6A15"
                        onClick={() => handleDelete(params?.row?.id)}
                    >
                        <TextSnippetIcon />
                    </StyledIconButton>
                    <StyledIconButton
                        size="small"                     
                        color="secondary"
                        onClick={() => handleDelete(params?.row?.id)}
                    >
                        <DeleteIcon />
                    </StyledIconButton>
                </>
            ),
        },
    ];

    return columns;
};