import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, List, ListItem, ListItemText, Modal, styled, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextSnippetOutlined from '@mui/icons-material/TextSnippetOutlined';
import MuiInput from './MuiInput';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import dayjs from 'dayjs';
import DescriptionIcon from '@mui/icons-material/Description';
import {
    isAutogeneratedRow,
} from '@mui/x-data-grid-premium';

const HeaderStyledBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: "100%",
}));

const StyledDrawerDivider = styled(Divider)({
    mr: 1,
    marginBottom: "1rem",
    borderColor: "#ED6A15",
    height: "1px",
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
const StyledTypography = styled(Typography)(({ theme }) => ({
    color: "#121212DE",
    fontWeight: "700"
}));
const NotesTypography = styled(Typography)(({ theme }) => ({
    mb: 2,
    textAlign: 'center',
    fontSize: {
        xs: '1.1rem',
        sm: '1.25rem'
    },
    fontWeight: "700",
    fontSize: "16px"
}));
const IconButtonStyle = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const InputStyleBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    "& .css-m72fcg-MuiFormControl-root-MuiTextField-root": {
        width: '87% !important',
    },
    "& .MuiDataGrid-root": {
        fontWeight: "700",
        fontSize: "16px",
    },
}));

const ModalBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    boxShadow: 24,
    padding: theme.spacing(4),
    borderRadius: 4,
}));

const ModalStyledTypography = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "2%"
}));

export const RowsDataColumns = ({ handleInputChange, handleDelete, selectedDate }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [activeInputId, setActiveInputId] = useState(null);

    const handleCopyModal = (inputId) => {
        setModalOpen(true);
        setActiveInputId(inputId);
    };

    const notes = [
        { id: 1, content: "Discuss project deadlines and deliverables.", date: "10/01/2024", time: "05.30pm" },
        { id: 2, content: "Complete the UI design for the dashboard.", date: "05/02/2024", time: "02.30pm" },
        { id: 3, content: "Submit the monthly report by EOD.", date: "01/03/2024", time: "06.30pm" },
    ];

    const handleSaveNotes = () => {
        setModalOpen(false)

    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const getWeekDays = () => {
        let startDate;
        if (Array?.isArray(selectedDate) && selectedDate?.length === 0) {
            startDate = dayjs().startOf('week').add(1, 'day');
        }
        else if (Array.isArray(selectedDate) && selectedDate.length > 0) {
            const [startDateStr] = selectedDate;
            startDate = dayjs(startDateStr, 'DD-MMM-YYYY');
        }
        else if (selectedDate) {
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
                minWidth: 100,
                borderBottom: "5px solid black",
                headerClassName: isToday ? 'highlight-column' : '',
                renderHeader: () => (
                    <HeaderStyledBox
                        sx={{
                            borderBottom: isToday ? '4px solid #ED6A15' : 'none',
                            "& .MuiDataGrid-columnHeaderTitleContainer": {
                                borderBottom: '5px solid orange !important',
                            },
                            "& .css-1k5yziq-MuiDataGrid-root .MuiDataGrid-row--borderBottom .MuiDataGrid-columnHeader": {
                                borderBottom: '5px solid green !important',
                            },
                        }}
                    >
                        <DayBox sx={{ color: isToday ? '#ED6A15' : '#121212DE' }}>
                            {currentDate.format('ddd')}
                        </DayBox>
                        <DateBox style={{ color: isToday ? '#ED6A15' : '#121212DE' }}>
                            {currentDate.format('DD MMM')}
                        </DateBox>
                    </HeaderStyledBox>
                ),
                valueGetter: (value, row) => {
                    if (isAutogeneratedRow(row)) {
                        return '[this is an autogenerated row]';
                    }
                    return `${value}`;
                },
                renderCell: (params) => {
                    if (params?.row?.isParent || isAutogeneratedRow(params?.row)) {

                        return <EmptyBox sx={{ backgroundColor: isToday ? '#FBE1D0' : 'transparent' }}></EmptyBox>;
                    }

                    const inputId = `${params.row.id}-day${i}`;
                    const isActive = activeInputId === inputId && !modalOpen;

                    console.log("isActive", isActive)

                    return (
                        <InputStyleBox
                            sx={{
                                backgroundColor: isToday ? '#FBE1D0' : 'transparent',

                                "& .MuiDataGrid-root": {
                                    backgroundColor: isToday ? '#FBE1D0' : 'transparent',
                                },
                            }}
                        >
                            <MuiInput
                                type={'number'}
                                onChange={(value) => handleInputChange(`day${i}`, value, params?.row?.id)}
                                value={params?.value}
                                disabled={false}
                                sx={{
                                    width: '80% !important',
                                    verticalAlign: 'unset',
                                    backgroundColor: "#FFFFFF",
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: isActive ? '1px solid #ED6A15' : 'inherit',
                                        },
                                        "&  .MuiOutlinedInput-input": {
                                            border: isActive ? '1px solid #ED6A15' : 'inherit',
                                        }
                                    }
                                }}
                            />
                            <IconButton
                                size="small"

                                onClick={() => handleCopyModal(inputId)}

                            >
                                <TextSnippetOutlined sx={
                                    {
                                        color: "grey",
                                        fontWeight: "400"
                                    }
                                } />
                            </IconButton>
                            <Modal
                                key="notes-modal"
                                open={modalOpen}
                                // onClose={handleCloseModal}
                                aria-labelledby="notes-modal"
                                BackdropProps={{
                                    style: {
                                        backgroundColor: 'rgba(206, 212, 218, 0.2)',
                                        opacity: "90%"
                                    }
                                }}
                            >
                                <ModalBox
                                    sx={{
                                        width: {
                                            xs: '90%',
                                            sm: '80%',
                                            md: '60%',
                                            lg: '50%'
                                        },
                                        maxWidth: '600px',
                                        margin: 'auto',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        padding: {
                                            xs: 2,
                                            sm: 3,
                                            md: 4
                                        }
                                    }}
                                >
                                    {/* Add close button */}
                                    <IconButton
                                        onClick={handleCloseModal}
                                        sx={{
                                            position: 'absolute',
                                            right: 2,
                                            top: -30,

                                            color: "#fff",
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>

                                    <NotesTypography
                                        variant="h6"
                                        component="h2"
                                        sx={{

                                        }}
                                    >
                                        Notes
                                    </NotesTypography>
                                    <StyledDrawerDivider />
                                    <Box
                                        sx={{
                                            mb: 3,
                                            height: "15rem",
                                            overflowY: "auto",
                                            padding: "1rem"
                                        }}
                                    >
                                        <List>
                                            {notes.map((note, index) => (
                                                <ListItem
                                                    key={index}
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'flex-start',
                                                        // gap: 1,
                                                        backgroundColor: '#fff',
                                                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.05)',
                                                        borderRadius: '8px',
                                                        paddingLeft: '10px',
                                                        mb: 1, // Adds spacing between tiles
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: '1rem', fontWeight: '600' }}>
                                                        {note?.content}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: '0.875rem', color: 'gray' }}>
                                                        {note?.date}&nbsp; &nbsp; &nbsp;{note?.time}

                                                    </Typography>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                    {/* <StyledDrawerDivider/> */}
                                    <Box>
                                        <ModalStyledTypography>Add New</ModalStyledTypography>
                                        <Box sx={{
                                            display: 'flex',
                                            flexDirection: {
                                                xs: 'column',
                                                sm: 'row'
                                            },
                                            alignItems: 'center',
                                            gap: 2
                                        }}>

                                            <MuiInput
                                                multiline={true}
                                                onChange={(value) => handleInputChange(`day${i}`, value, params?.row?.id)}
                                                value={params?.value}
                                                rows={2}
                                                disabled={false}
                                                sx={{
                                                    width: {
                                                        xs: '100% !important',
                                                        sm: '80% !important'
                                                    },
                                                    verticalAlign: 'unset',
                                                    backgroundColor: "#FFFFFF",
                                                }}

                                            />
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    height: '40px',
                                                    width: {
                                                        xs: '100%',
                                                        sm: '120px'
                                                    },
                                                    backgroundColor: "#ED6A15"
                                                }}
                                                onClick={() => handleSaveNotes()}
                                            >
                                                Save
                                            </Button>
                                        </Box>
                                    </Box>
                                </ModalBox>
                            </Modal>
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
            headerName: 'ACTIONS',
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
                    return <EmptyBox
                        sx={{ backgroundColor: 'transparent' }}></EmptyBox>;
                }
                return (
                    <IconButtonStyle >
                        {/* <IconButton
                            size="small"
                            color="red"
                        // onClick={() => handleDelete(params?.row?.id)}
                        >
                            <TextSnippetIcon />
                        </IconButton> */}
                        <StyledTypography>
                            0
                        </StyledTypography>
                        <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleDelete(params?.row?.id)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </IconButtonStyle>
                );
            },
        },

    ];

    return columns;
};

