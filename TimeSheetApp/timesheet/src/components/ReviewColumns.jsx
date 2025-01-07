import React from 'react';
import { Box, IconButton, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import MuiInput from './MuiInput';
import clsx from 'clsx';
import dayjs from 'dayjs';
import {
    isAutogeneratedRow,
} from '@mui/x-data-grid-premium';

const StyledStack = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: "100%",
}));

const StyledTypography = styled(Typography)({
    fontWeight:"700" , 
    marginTop:"10px"
 });
const DayBox = styled(Box)(({ theme }) => ({
  fontWeight: '700', 
  textAlign: 'center'
}));
const EmptyBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
}));

const DateBox = styled(Box)(({ theme }) => ({
    fontWeight: '400', 
    fontSize: '14px', 
    textAlign: 'center' 
}));

const InputStyleBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    // backgroundColor: isToday ? '#FBE1D0' : 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& .css-m72fcg-MuiFormControl-root-MuiTextField-root": {
        width: '87% !important',

    },
    "& .MuiDataGrid-root": {
        // backgroundColor: isToday ? '#FBE1D0' : 'transparent',
        fontWeight: "700",
        fontSize: "16px",
    },
}));

export const ReviewColumns = ({ handleInputChange, handleDelete, selectedDate }) => {

    const handleCopyModal = (inputId) => {
        // setModalOpen(true);
        // setActiveInputId(inputId);
    };

    const getWeekDays = () => {
        let startDate;
        if (Array?.isArray(selectedDate) && selectedDate?.length === 0) {
            startDate = dayjs().startOf('week').add(1, 'day');
        } else if (selectedDate) {
            const [startDateStr] = selectedDate?.split(' - ');
            startDate = dayjs(startDateStr, 'DD MMM YYYY');
        } else {
            startDate = dayjs().startOf('week').add(1, 'day');
        }

        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const currentDate = dayjs(startDate).add(i, 'day');
            const isToday = currentDate?.isSame(dayjs(), 'date');

            weekDays.push({
                field: `day${i}`,
                headerName: currentDate?.format('ddd'),
                flex: 1,
                minWidth: 120,
                borderBottom:"5px solid black",
                headerClassName: isToday ? 'highlight-column' : '',

                renderHeader: () => (
                    <StyledStack
                        // sx={{
                            
                        //     // borderBottom:"5px solid black",                     
                        //     // borderBottom: isToday ? '4px solid #ED6A15' : 'none',        
                        //     "& .MuiDataGrid-columnHeaderTitleContainer": {
                        //         borderBottom: '5px solid orange !important', 
                        //     },            
                        //     "& .css-1k5yziq-MuiDataGrid-root .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader": {
                        //         borderBottom: '5px solid green !important',
                        //     },            
                        // }}
                    >

                        <DayBox >
                            {currentDate.format('ddd')}
                        </DayBox>
                        <DateBox >
                            {currentDate.format('DD MMM')}
                        </DateBox>
                    </StyledStack>
                ),
                valueGetter: (value, row) => {
                    if (isAutogeneratedRow(row)) {
                        return '[this is an autogenerated row]';
                    }
                    return `title: ${value}`;
                },
                renderCell: (params) => {
                    if (params?.row?.isParent || isAutogeneratedRow(params?.row)) {

                        return <EmptyBox></EmptyBox>;
                    }
                    return (
                        <InputStyleBox>
                            <MuiInput
                                type={'number'}
                                onChange={(value) => handleInputChange(`day${i}`, value, params?.row?.id)}
                                value={params?.value || 0}
                                disabled={false}
                                sx={{
                                    width: '87% !important',
                                    verticalAlign: 'unset',
                                    backgroundColor: "#FFFFFF",

                                }}
                            />
                                <IconButton
                                size="small"
                                color="red"
                                onClick={() => handleCopyModal()}
                            >
                                <TextSnippetIcon />
                            </IconButton>
                        </InputStyleBox>
                    );
                },
            });
        }
        return weekDays;
    };

    const weekDayColumns = getWeekDays();

    const columns = [
    

        ...weekDayColumns,
        {
            field: 'Actions',
            headerName: '',
            flex: 0.5,
            minWidth: 100,
            valueGetter: (value, row) => {
                if (isAutogeneratedRow(row)) {
                    return '[this is an autogenerated row]';
                }
                return `title: ${value}`;
            },
            renderCell: (params) => {
                if (params.row.isParent || isAutogeneratedRow(params.row)) {
                    return <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'transparent',
                        }}
                    ></Box>;
                }
                return (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {/* <IconButton
                            size="small"
                            sx={{ marginBottom: '10px' }}
                            color="#ED6A15"
                            // onClick={() => handleDelete(params?.row?.id)}
                        >
                            <TextSnippetIcon />
                        </IconButton> */}
                        <Typography sx={{ color: "#121212DE", fontWeight: "700" }} >
                            0
                        </Typography>
                        <IconButton
                            size="small"
                            sx={{ marginBottom: '10px' }}
                            color="secondary"
                            onClick={() => handleDelete(params?.row?.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                );
            },
        },
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

    ];

    return columns;
};


    // {
        //     field: 'project',
        //     headerName: '',
        //     flex: 0.5,
        //     minWidth: 100,
        //     treeField: true,
        //     renderCell: (params) => {
        //         const indent = params.api.getRowNode(params.id)?.depth * 10 || 0;
        //         return (
        //             <Box sx={{
        //                 ml: `${indent}px`, display: "flex",
        //                 justifyContent: "center",
        //                 alignItems: "center",
        //                 marginTop: "10px",
        //             }}>
        //                 <Typography sx={{ color: "#121212DE", fontWeight: "700", marginLeft: "-10px" }}>
        //                     {params.value}
        //                 </Typography>
        //             </Box>
        //         );
        //     },
        // },

        // {
        //     field: 'level',
        //     headerName: '',
        //     flex: 0.5,
        //     minWidth: 150,
        //     treeField: true,
        //     renderCell: (params) => {
        //         const indent = params.api.getRowNode(params.id)?.depth * 10
        //         return (
        //             <Box
        //                 sx={{
        //                     ml: `${indent}px`,
        //                     display: "flex",
        //                     justifyContent: "center",
        //                     alignItems: "center",
        //                     marginTop: "10px",
        //                     overflowX: "auto",
        //                     // whiteSpace: "nowrap",
        //                     scrollbarWidth: "none", 
        //                    '&::-webkit-scrollbar': { display: 'none' },
        //                 }}>
        //                 <Typography 
        //                 sx={{ 
        //                     color: "#0073E6DE", 
        //                     fontWeight: "500", 
        //                     // marginLeft:"5px",
        //                     overflow: "hidden", 
        //                     textOverflow: "ellipsis", 
        //                     whiteSpace: "nowrap", 
        //                     }}>
        //                     {params.value}
        //                 </Typography>
        //             </Box>
        //         );
        //     },
        // },