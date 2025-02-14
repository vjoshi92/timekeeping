import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Modal,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import {
  formatFullDateString,
  formatFullTimeString,
  PrepareBatchPayload,
} from "utils/AppUtil";
import MuiInput from "./MuiInput";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import {
  useGetUserDataQuery,
  useMakeBatchCallMutation,
} from "api/timesheetApi";
import DecimalInput from "./DecimalInput";
import BusyDialog from "./BusyLoader";

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

const ChangeEntry = ({
  open,
  inputHours,
  handleClose,
  activeInputId,
  rowObject,
}) => {
  const dispatch = useDispatch();
  const { data: userData } = useGetUserDataQuery();

  const [hours, setHours] = useState();
  const [changeReason, setChangeReason] = useState("");

  useEffect(() => {
    setHours();
  }, [activeInputId]);
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
    const oPayload = prepareNoteSavePayload(changeReason);
    const obatchPayload = PrepareBatchPayload([oPayload]);
    const response = await makeBatchCall({ body: obatchPayload });
    handleClose();
  };

  const prepareNoteSavePayload = (note) => {
    const row = rowObject?.row;
    const index = rowObject?.index;
    const date = formatFullDateString(new Date());
    const time = formatFullTimeString(new Date());
    const userName = userData?.results[0]?.EmployeeName?.FormattedName;
    // const noteString = `${note},${date},${time},${userName};`;
    const prevNote = row[`day${index}Notes`];
    let noteString = `${note},${date},${time},${userName}\n`;
    if (prevNote) {
      noteString = prevNote + "\n" + noteString;
    }
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
    return temp;
  };

  return (
    <Modal
      keepMounted
      open={open}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
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
            <br/>
            <Stack
              direction={"column"}
              justifyContent={"space-between"}
              sx={{ width: "100%" }}
            >
              <Box sx={{ width: "100%" }} direction={"row"}>
                <Typography sx={{ fontWeight: "600" }}>Prev. Hours <span style={{color:"red"}}>*</span> </Typography>
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
                  New Hours <span style={{color:"red"}}>*</span>
                </Typography>
                <DecimalInput
                  disabled={false}
                  onChange={(value) => setHours(value)}
                  sx={{
                    width: "100%",
                    marginTop: "20px",
                    height: "30px",
                    padding: "5px",
                    lineHeight: "1",
                  }}
                  value={hours}
                />
              </Box>
              <Box sx={{ width: "100%"}}>
                <Typography sx={{ fontWeight: "600", marginTop: "20px" }}>
                  Reason <span style={{color:"red"}}>*</span>
                </Typography>
                <MuiInput
                  rows={2}
                  multiline={true}
                  onChange={(value) => setChangeReason(value)}
                  placeholder="Please specify the reason"
                  sx={{ width: "100%", marginTop: "20px" }}
                  value={changeReason}
                />
              </Box>
            </Stack>
          </RejectionMainBox>

          <RejectButtonStack direction="row" spacing={3}>
            <CancelNoteButton
              id="keep-mounted-modal-title"
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
                  id="keep-mounted-modal-description"
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
