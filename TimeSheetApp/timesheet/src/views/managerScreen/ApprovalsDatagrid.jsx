import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ApprovalIcon from "@mui/icons-material/Approval";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import MuiDataGrid from "components/MuiDataGrid";
import { Stack, Tooltip, Typography } from "@mui/material";
import {
  useGetPendingApprovalListQuery,
  useLazyGetPendingApprovalListQuery,
} from "api/timesheetApi";
import { sortDatewiseArray, weekTimesheetFormat } from "utils/AppUtil";
import { setSelectedPendingApprovals } from "store/slice/TimesheetSlice";
import { useDispatch, useSelector } from "react-redux";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StyledBox = styled(Stack)(({ theme }) => ({
  display: "flex",
  // gap: '10px',
  marginTop: "0.5rem"
}));

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  "& .MuiDataGrid-cell": {
    border: "none",
    // width:250
  },
  "& .MuiDataGrid-columnHeaders": {
    border: "none",
    backgroundColor: "#BDBDBD",
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "black",
  },
  '& .MuiDataGrid-cell[data-field="timesheet"]': {
    color: "#0073E6",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#EEEEEE",
    color: "#121212DE",
    fontWeight: "700",
    fontSize: "16px",
  },
  '& .MuiDataGrid-columnHeader[data-field="Check"]': {
    display: "none",
  },
  "& .MuiDataGrid-columnHeaders > .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator":
  {
    display: "none",
  },
}));

export default function ApprovalsDatagrid({
  setCheckboxChecked,
  setShowApproveAll,
  handleApprove
}) {
  const [isChecked, setIsChecked] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState({});
  const [checkboxClickedCount, setCheckboxClickedCount] = React.useState(0);
  const [approvalData, setApprovalData] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: pendingApprovalList, isSuccess: successPendingData, isFetching: fetchingPendingApproval } =
    useGetPendingApprovalListQuery();

  const selectedPendingApprovals = useSelector((state) => state?.CreateForm?.selectedPendingApprovals);

  React.useEffect(() => {
    if (successPendingData) {
      let data = [];
      data = pendingApprovalList?.results?.map(x => {
        return {
          ...x,
          id: Math.random(),
          weekDate: weekTimesheetFormat(x?.Week),
        }
      });
      const aData = sortDatewiseArray(data);
      setApprovalData(aData);
    }

  }, [fetchingPendingApproval])

  const handleEyeClick = (params) => {
    const allData = params.row;
    navigate(`/Review/true/${params?.Pernr}/${params?.BEGDA}/${params?.ENDDA}/${params?.Week}/team`, { state: { data: allData } });
  };

  // Modified to handle individual checkbox states
  const handleChecked = (event, row) => {
    // Create new state object with the toggled value for the specific checkbox
    const newCheckedItems = {
      ...checkedItems,
      [row.id]: !checkedItems[row.id],
    };
    setCheckedItems(newCheckedItems);

    // Increment click counter for UI state tracking
    const newClickCount = checkboxClickedCount + 1;
    setCheckboxClickedCount(newClickCount);

    // Count how many checkboxes are currently checked
    const checkedCount = Object.values(newCheckedItems).filter(Boolean).length;



    // add the item to array if checked or remove it
    let selectedData = [...selectedPendingApprovals];
    if (event.target.checked) {
      selectedData.push(row);
    } else {
      const i = selectedData.indexOf(row);
      selectedData.splice(i, 1);
    }

    // Update UI state based on number of checked items
    if (selectedData?.length > 1) {
      // Multiple items checked - show approve all button
      setShowApproveAll(true);
      setCheckboxChecked(false);
    } else if (selectedData?.length === 1) {
      // Single item checked - show individual approve
      setShowApproveAll(false);
      setCheckboxChecked(true);
    } else {
      // No items checked - reset UI
      setShowApproveAll(false);
      setCheckboxChecked(false);
    }

    dispatch(setSelectedPendingApprovals(selectedData));
  };

  const columns = [
    {
      field: "Check",
      headerName: "",
      sortable: false,
      type: "string",
      filterable: false,
      sortable: false,
      width: 50,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          {/* Modified checkbox to use individual state from checkedItems object */}
          <Checkbox
            {...label}
            checked={!!checkedItems[params.row.id]}
            onChange={(event) => handleChecked(event, params.row)}
            sx={{
              padding: 0,
              margin: 0,
            }}
          />
        </Box>
      ),
    },
    {
      field: "weekDate",
      headerName: "TIMESHEET",
      minWidth: 200,
      type: "string",
      flex: 1,
      // renderCell: (params) => <Typography>{weekTimesheetFormat(params?.value)}</Typography>,
    },
    {
      field: "EName",
      headerName: "EMPLOYEE NAME",
      width: 210,
      type: "string",
    },    
    {
      field: "CatsHours",
      headerName: "TOTAL HOURS",
      type: "string",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "APNAM",
      headerName: "Approver",
      minWidth: 200,
      type: "string",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      type: "string",
      minWidth: 200,
      filterable: false,
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <StyledBox direction={"row"}>
          <Tooltip title="View timesheet">
            <RemoveRedEyeIcon
              sx={{ color: "#0073E6", cursor: "pointer", marginRight: "10%" }}
              onClick={() => handleEyeClick(params?.row)}
            />
          </Tooltip>
          <Tooltip title="Approve timesheet">
            <CheckIcon color="success" style={{ cursor: "pointer" }} onClick={() => handleApprove(params?.row)} />
          </Tooltip>
        </StyledBox>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <MuiDataGrid
        datagridName={"pendingApprovalList"}
        rows={approvalData}
        columns={columns}
        pagination
        pageSize={5}
        rowsPerPageOptions={[5, 10, 15]}
        loading={fetchingPendingApproval}
      />
    </Box>
  );
}
