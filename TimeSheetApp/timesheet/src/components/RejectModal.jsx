import React, { useEffect } from "react";
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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
// import { MuiInput } from './MuiInput';
// import { ModalBox, NotesTypography, StyledDrawerDivider, ModalStyledTypography } from './StyledComponents';
import {
  formatFullDateString,
  formatFullTimeString,
  getODataFormatDate,
  getWeekStartDate,
  PrepareBatchPayload,
} from "utils/AppUtil";
import { addNotes, setNewRowAdded } from "store/slice/TimesheetSlice";
import MuiInput from "./MuiInput";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserDataQuery,
  useMakeBatchCallMutation,
} from "api/timesheetApi";
import BusyDialog from "./BusyLoader";
import dayjs from "dayjs";

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
  isRejected,
  setHasNote,
  activeInputId,
  rowObject,
}) => {
  const [newNote, setNewNote] = React.useState("");
  const dispatch = useDispatch();
  const { data: userData } = useGetUserDataQuery();
  const status = useSelector((state) => state?.CreateForm?.status);
  const selectedDate = useSelector((state) => state?.home?.daterange);
  // use notes from props
  // const notes = useSelector((state) => state?.CreateForm?.notes);
  console.log("rowObject", rowObject);
  const [
    makeBatchCall,
    {
      isSuccess: batchCallIsSuccess,
      isLoading: batchCallLoading,
      error: batchCallIsError,
    },
  ] = useMakeBatchCallMutation();

  const saveNote = async () => {
    const oPayload = prepareNoteSavePayload(newNote);
    const obatchPayload = PrepareBatchPayload(oPayload);
    const response = await makeBatchCall({ body: obatchPayload });
    dispatch(setNewRowAdded(false));
    onClose();
  };

  const prepareNoteSavePayload = (note) => {
    const row = rowObject?.row;
    const index = rowObject?.index;
    const date = formatFullDateString(new Date());
    const time = formatFullTimeString(new Date());
    const userName = userData?.results[0]?.EmployeeName?.FormattedName;
    const prevNote = row[`day${index}Notes`];
    let noteString = `${note},${date},${time},${userName}\n`;
    if (prevNote) {
      noteString = prevNote + "\n" + noteString;
    }

    if (row[`day${index}Counter`]) {
      const temp = {
        __metadata: {
          type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
        },
        TimeEntryDataFields: {
          __metadata: {
            type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
          },
          CATSHOURS: row[`day${index}`],
          PERNR: userData?.results[0].EmployeeNumber,
          CATSQUANTITY: row[`day${index}`],
          LTXA1: noteString.substring(0, 40),
          LONGTEXT: "X",
          MEINH: "H",
          UNIT: "H",
          WORKDATE: row[`day${index}WORKDATE`],
          LONGTEXT_DATA: noteString,
          POSID: row?.level,
        },
        Pernr: userData?.results[0].EmployeeNumber,
        TimeEntryOperation: row[`day${index}timeEntryOperation`] || "C",
        Counter: row[`day${index}Counter`] || "",
        AllowRelease: "",
        RecRowNo: "1",
      };
      return [temp];
    } else {
      let entries = [];
      for (let i = 0; i < 7; i++) {
        let startDate = new Date();
        let entry = row;
        if (selectedDate && selectedDate.length && selectedDate.length > 0) {
          const dates = selectedDate.split(" - ");
          startDate = dates[0];
        } else {
          startDate = getWeekStartDate();
        }
        let note = "";
        if(index === i){
          note = noteString;
        }

        const currentDate = dayjs(startDate).add(i, "day");
        const payloadDate = getODataFormatDate(currentDate.$d);
        if (entry[`day${i}`] && parseFloat(entry[`day${i}`]) > 0) {
          const temp = {
            __metadata: {
              type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
            },
            TimeEntryDataFields: {
              __metadata: {
                type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
              },
              CATSHOURS: entry[`day${i}`],
              PERNR: userData?.results[0].EmployeeNumber,
              CATSQUANTITY: entry[`day${i}`],
              LTXA1: note.substring(0, 40),
              LONGTEXT: note ? "X" : "",
              MEINH: "H",
              UNIT: "H",
              WORKDATE: payloadDate,
              LONGTEXT_DATA: note,
              POSID: entry?.level,
            },
            Pernr: userData?.results[0].EmployeeNumber,
            TimeEntryOperation: entry[`day${i}timeEntryOperation`] || "C",
            Counter: entry[`day${i}Counter`] || "",
            AllowRelease: "",
            RecRowNo: (entries.length + 1).toString(),
          };
          entries.push(temp);
        }
      }
      return entries;
    }
  };

  // const addLocalNotes = () => {
  //   if (newNote) {
  //     dispatch(
  //       addNotes({
  //         id: Math.random(),
  //         content: newNote,
  //         date: formatFullDateString(new Date()),
  //         time: formatFullTimeString(new Date()),
  //         username: "Vijay Joshi",
  //       })
  //     );
  //     if (activeInputId) {
  //       setHasNote((prev) => new Set(prev).add(activeInputId));
  //     }
  //   }
  //   setNewNote("");
  // };

  return (
    <>
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
        {batchCallLoading ? (
          <CircularProgress
            size={24}
            sx={{
              color: "green",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        ) : (
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
                {rowObject?.notes?.map((note, index) => (
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
                      <Stack
                        direction={"row"}
                        spacing={1}
                        alignItems={"center"}
                      >
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
                    <Typography sx={{ fontSize: "1rem", fontWeight: "600" }}>
                      {note?.content}
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", color: "gray" }}>
                      {note?.date}&nbsp;{note?.time}&nbsp;{note?.username}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <ModalStyledTypography>Add New Note</ModalStyledTypography>
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
                  // value={newNote}
                  rows={2}
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
                  onClick={saveNote}
                  disabled={status === "Approved"}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </ModalBox>
        )}
      </Modal>
    </>
  );
};

export default RejectModal;
