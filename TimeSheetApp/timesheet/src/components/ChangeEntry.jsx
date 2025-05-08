import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  LinearProgress,
  CircularProgress,
  TextField,
} from "@mui/material";
import {
  formatFullDateString,
  formatFullTimeString,
  getODataFormatDate,
  getWeekStartDate,
  PrepareBatchPayload,
  roundToNearestQuarter,
} from "utils/AppUtil";
import MuiInput from "./MuiInput";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetUserDataQuery,
  useMakeBatchCallMutation,
} from "api/timesheetApi";
import DecimalInput from "./DecimalInput";
import BusyDialog from "./BusyLoader";
import { setNewRowAdded, updateRow } from "store/slice/TimesheetSlice";
import dayjs from "dayjs";

// rejection component
const RejectionBox = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  display: "flex",
  borderRadius: "6px",
  width: "400px",
  // height: "32%",
  justifyContent: "flex-end",
  alignItems: "center",
  flexDirection: "column",
  padding: "20px",
}));

const RejectionMainBox = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "5%",
}));

const RejectButtonStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  direction: "row",
  display: "flex",
  justifyContent: "flex-end",
  marginTop: "4%",
}));

const CancelNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  border: "1px solid #ED6A15",
  boxShadow: 1,
}));

const SaveNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#FFFF",
}));

const CancelNoteTypography = styled(Typography)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "700",
  color: "#ED6A15",
}));

const SaveNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "#ED6A15",
  boxShadow: 1,
}));

const DisableSaveNoteButton = styled(Button)(({ theme }) => ({
  width: "100px",
  height: "42px",
  marginRight: "10px",
  borderRadius: "6px",
  backgroundColor: "grey",
  boxShadow: 1,
}));

const ModalTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "16px",
  marginBottom: "3%",
}));

const InputField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    height: "22.5px",
    padding: "10px",
    fontSize: "16px",
    color: "#333",
    fontWeight: "500"
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
  },
}));

const ChangeEntry = ({
  open,
  inputHours,
  handleClose,
  activeInputId,
  rowObject,
  setBatchCallType,
  updateTotalRow
}) => {
  const dispatch = useDispatch();
  const { data: userData } = useGetUserDataQuery();
  const selectedDate = useSelector((state) => state?.home?.daterange);
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [hours, setHours] = useState("");
  const [changeReason, setChangeReason] = useState("");


  useEffect(() => {
    setHours("");
    setChangeReason("");
  }, [open]);

  // useEffect(() => {
  //   setHours();
  // }, [activeInputId]);
  // use notes from props
  // const notes = useSelector((state) => state?.CreateForm?.notes);  
  const [
    makeBatchCall,
    {
      isSuccess: batchCallIsSuccess,
      isLoading: batchCallLoading,
      error: batchCallIsError,
    },
  ] = useMakeBatchCallMutation();

  // useEffect(() => {
  //   if (batchCallIsSuccess) {
  //     handleClose();
  //   }
  // }, [batchCallLoading]);

  const saveHours = async () => {
    // new code to save the change entry in store
    let row = { ...rowObject?.row };
    const rowIndex = projectedData.indexOf(rowObject?.row);
    const index = rowObject?.index;
    const date = formatFullDateString(new Date());
    const time = formatFullTimeString(new Date());
    const userName = userData?.results[0]?.EmployeeName?.FormattedName;
    // const noteString = `${note},${date},${time},${userName};`;
    const prevNote = row[`day${index}Notes`];
    // remove \n with |n inside the actual text
    let noteValue = changeReason;
    if (noteValue.includes("\n")) {
      noteValue = noteValue.replaceAll("\n", "|n",);
    }
    let noteString = `${noteValue},${date},${time},${userName}`;
    if (prevNote) {
      noteString = prevNote + "\n" + noteString;
    }
    row[`day${index}Notes`] = noteString;
    row[`day${index}`] = hours;
    row[`day${index}STATUS`] = row[`day${index}STATUS`] === "40" ? "10" : row[`day${index}STATUS`];
    if (hours === '0.00' || hours == '0') {
      row[`day${index}timeEntryOperation`] = "D";
    }

    let rowSum = 0;
    for (let i = 0; i < 7; i++) {
      if (`day${i}` !== `day${index}`) {
        rowSum = parseFloat(rowSum) + parseFloat(row[`day${i}`] || 0);
      } else {
        rowSum = parseFloat(rowSum) + parseFloat(hours);
        row = { ...row, [`day${index}`]: hours };
      }
    }

    row = { ...row, weekTotal: parseFloat(rowSum).toFixed(2) };

    dispatch(updateRow({
      rowIndex: rowIndex,
      rowObj: row
    }));
    handleClose();
    updateTotalRow(`day${index}`, rowIndex, row);


    // old code to save the entry directly in backend
    // if (setBatchCallType) {
    //   setBatchCallType("changeEntry");
    // }
    // const oPayload = prepareNoteSavePayload(changeReason);
    // const obatchPayload = PrepareBatchPayload([oPayload]);
    // const response = await makeBatchCall({ body: obatchPayload });
    // dispatch(setNewRowAdded(false));
    // handleClose();
  };

  const prepareNoteSavePayload = (note) => {
    const row = rowObject?.row;
    const index = rowObject?.index;
    const date = formatFullDateString(new Date());
    const time = formatFullTimeString(new Date());
    const userName = userData?.results[0]?.EmployeeName?.FormattedName;
    // const noteString = `${note},${date},${time},${userName};`;
    const prevNote = row[`day${index}Notes`];
    let noteString = `${note},${date},${time},${userName}`;
    if (prevNote) {
      noteString = prevNote + "\n" + noteString;
    }

    // make the date for payload in case of new entry 
    let startDate = new Date();
    if (selectedDate && selectedDate.length && selectedDate.length > 0) {
      const dates = selectedDate.split(" - ");
      startDate = dates[0];
    } else {
      startDate = getWeekStartDate();
    }

    const currentDate = dayjs(startDate).add(index, "day");
    const payloadDate = getODataFormatDate(currentDate.$d);

    const temp = {
      __metadata: {
        type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntry",
      },
      TimeEntryDataFields: {
        __metadata: {
          type: "ZHCMFAB_TIMESHEET_MAINT_SRV.TimeEntryDataFields",
        },
        CATSHOURS: hours,
        PERNR: userData?.results[0].EmployeeNumber,
        CATSQUANTITY: hours,
        LTXA1: noteString.substring(0, 40),
        MEINH: "H",
        LONGTEXT: "X",
        UNIT: "H",
        WORKDATE: row[`day${index}WORKDATE`] || payloadDate,
        LONGTEXT_DATA: noteString,
        POSID: row?.level,
      },
      Pernr: userData?.results[0].EmployeeNumber,
      TimeEntryOperation: row[`day${index}timeEntryOperation`] || "C",
      Counter: row[`day${index}Counter`] || "",
      AllowRelease: "",
      RecRowNo: "1",
    };
    return temp;
  };

  const handleChange = (text, action) => {
    if (text) {
      if (action === 'blur') {
        const convertedValue = roundToNearestQuarter(text);
        const formattedValue = parseFloat(convertedValue).toFixed(2);
        setHours(formattedValue);
      } else {
        const inputValue = text.replace(/[^\d.]/g, "");
        setHours(inputValue);
      }
    } else {
      setHours(text);
    }
  };

  return (
    <Modal disableAutoFocus={true}
      autoFocus={false}
      disableEnforceFocus={true}
      keepMounted
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      BackdropProps={{
        style: {
          backgroundColor: "#121212 !important",
          opacity: "20%",
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
        <RejectionBox>
          <RejectionMainBox>
            <ModalTypography>{"Change Entry"}</ModalTypography>
            <br />
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Box sx={{ width: "100%" }} direction={"row"}>
                <Typography sx={{ fontWeight: "600" }}>Prev. Hours <span style={{ color: "red" }}>*</span> </Typography>
                <Box
                  component="div"
                  sx={{
                    verticalAlign: "unset",
                    // backgroundColor: "#ef0c0c30"
                    border: `1px solid grey`,
                    borderRadius: "4px",
                    height: "1.2rem",
                    marginTop: "2px",
                    height: "30px",
                    padding: "5px",
                    lineHeight: "1",
                  }}
                >
                  <Typography color="#797b79 !important">
                    {rowObject?.value}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: "600", marginTop: "20px" }}>
                  New Hours <span style={{ color: "red" }}>*</span>
                </Typography>
                <InputField size="small" fullWidth onChange={(e) => handleChange(e.target.value, 'change')}
                  onBlur={(e) => handleChange(e.target.value, 'blur')}
                  value={hours} />
                {/* <DecimalInput
                  readOnly={false}
                  onChange={(value) => setHours(value)}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    height: "30px",
                    padding: "5px",
                    lineHeight: "1",
                  }}
                  value={hours || ''}
                /> */}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Typography sx={{ fontWeight: "600", marginTop: "20px" }}>
                  Reason <span style={{ color: "red" }}>*</span>
                </Typography>
                <InputField fullWidth
                  rows={2}
                  multiline={true}
                  onChange={(e) => setChangeReason(e.target.value)}
                  placeholder="Please specify the reason"
                  value={changeReason}
                  autoFocus={true}
                />
              </Box>
            </Stack>
          </RejectionMainBox>

          <RejectButtonStack direction="row" spacing={3}>
            <CancelNoteButton
              variant="h6"
              component="h2"
              size="small"
              onClick={() => handleClose()}
            >
              <CancelNoteTypography>Cancel</CancelNoteTypography>
            </CancelNoteButton>
            {hours == "" || changeReason == "" ? (
              <DisableSaveNoteButton disabled>
                <SaveNoteTypography>Save</SaveNoteTypography>
              </DisableSaveNoteButton>
            ) : (
              <>
                <SaveNoteButton
                  sx={{ mt: 2 }}
                  size="small"
                  onClick={saveHours}
                >
                  <SaveNoteTypography>Save</SaveNoteTypography>
                </SaveNoteButton>
              </>
            )}
          </RejectButtonStack>
        </RejectionBox>
      )}
    </Modal>
  );
};

export default ChangeEntry;
