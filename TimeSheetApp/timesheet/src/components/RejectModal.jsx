import React, { useEffect } from 'react';
import {
    Box,
    Button,
    IconButton,
    List,
    ListItem,
    Stack,
    Typography,
    Modal,
    Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import { MuiInput } from './MuiInput';
// import { ModalBox, NotesTypography, StyledDrawerDivider, ModalStyledTypography } from './StyledComponents';
import { formatFullDateString, formatFullTimeString } from 'utils/AppUtil';
import { addNotes } from 'store/slice/TimesheetSlice';
import MuiInput from './MuiInput';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';


const ModalBox = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#fff",
    boxShadow: 24,
    padding: theme.spacing(4),
    borderRadius: 4,
}));

const StyledDrawerDivider = styled(Divider)({
    mr: 1,
    marginBottom: "1rem",
    borderColor: "#ED6A15",
    height: "1px",
});

const NotesTypography = styled(Typography)(({ theme }) => ({
    // mb: 2,
    textAlign: "center",
    fontSize: {
        xs: "1.1rem",
        sm: "1.25rem",
    },
    fontWeight: "700",
    fontSize: "16px",
}));

const ModalStyledTypography = styled(Box)(({ theme }) => ({
    fontWeight: 600,
    fontSize: "16px",
    marginBottom: "2%",
}));


const RejectModal = ({
    open,
    onClose,
    isRejected
}) => {
    const [newNote, setNewNote] = React.useState('');
    const dispatch = useDispatch()
    const notes = useSelector((state) => state?.CreateForm?.notes);

    const addLocalNotes = () => {
        if (newNote) {
            dispatch(
                addNotes({
                    id: Math.random(),
                    content: newNote,
                    date: formatFullDateString(new Date()),
                    time: formatFullTimeString(new Date()),
                    username: "Vijay Joshi",
                })
            );
        }
        setNewNote("");
    };

    return (
        <Modal
            open={open}
            // onClose={onClose}
            aria-labelledby="notes-modal"
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(206, 212, 218, 0.2)",
                    opacity: "90%",
                },
            }}
        >
            <ModalBox
                sx={{
                    width: {
                        xs: "90%",
                        sm: "80%",
                        md: "60%",
                        lg: "50%",
                    },
                    maxWidth: "600px",
                    margin: "auto",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                    overflowY: "auto",
                    maxHeight: "90vh",
                    borderRadius: "8px",
                }}
            >
                <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    <NotesTypography variant="h6" component="h2">
                        Notes and Rejection Reasons
                    </NotesTypography>
                    <IconButton
                        onClick={onClose}
                        sx={{
                            right: 2,
                            top: 0,
                            color: "#000",
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <StyledDrawerDivider />

                <Box
                    sx={{
                        mb: 3,
                        height: "15rem",
                        overflowY: "auto",
                        padding: "1rem",
                    }}
                >
                    <List>
                        {notes?.map((note, index) => (
                            <ListItem
                                key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    backgroundColor: "#fff",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
                                    borderRadius: "8px",
                                    paddingLeft: "10px",
                                    mb: 1,
                                }}
                            >
                                {note?.rejected && (
                                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                                        <WarningAmberIcon color="error" />
                                        <Typography
                                            fontSize={"1rem"}
                                            fontWeight={"600"}
                                            color="error"
                                        >
                                            REJECTED
                                        </Typography>
                                    </Stack>
                                )}
                                <Typography
                                    sx={{ fontSize: "1rem", fontWeight: "600" }}
                                >
                                    {note?.content}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "0.875rem", color: "gray" }}
                                >
                                    {note?.date}&nbsp;{note?.time}&nbsp;{note?.username}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box>
                    <ModalStyledTypography>Add New</ModalStyledTypography>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: {
                                xs: "column",
                                sm: "row",
                            },
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        <MuiInput
                            multiline={true}
                            onChange={(value) => setNewNote(value)}
                            value={newNote}
                            rows={2}
                            disabled={false}
                            sx={{
                                width: {
                                    xs: "100% !important",
                                    sm: "80% !important",
                                },
                                verticalAlign: "unset",
                                backgroundColor: "#FFFFFF",
                            }}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                height: "40px",
                                width: {
                                    xs: "100%",
                                    sm: "120px",
                                },
                                backgroundColor: "#ED6A15",
                            }}
                            onClick={addLocalNotes}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </ModalBox>
        </Modal>
    );
};

export default RejectModal;