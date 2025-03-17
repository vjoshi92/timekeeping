import React, { useState } from "react";
import {
  DataGridPremium,
  gridClasses,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from "@mui/x-data-grid-premium";
import { darken, lighten, styled } from "@mui/material/styles";
import { Box, Stack, Typography } from "@mui/material";
import { LicenseInfo } from "@mui/x-license";

const StyledBox = styled(Box)({
  overflowX: 'auto',
  width: '100%',
});

const StyledDataGridPremium = styled(DataGridPremium)({
  "& .MuiDataGrid-cell": {
    paddingTop: "5px !important",
    backgroundColor: "#FFFF"
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "#EEEEEE",
    color: "#121212DE",
    fontWeight: "700 !important",
    fontSize: "14px"
  },
  ".MuiDataGrid-columnHeaderTitle": {
    fontWeight: 700
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "#CCC !important", // This will change the column divider color to green
  },
});

const MuiDataGrid = ({ columns, rows, pagination, density, datagridName, disableColumnMenu, loading }) => {
  LicenseInfo.setLicenseKey(
    "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
  );

  const apiRef = useGridApiRef();

  const [filterModel, setFilterModel] = useState({
    items: [],
  });

  return (
    <Box sx={{ height: "65vh", width: "100%", border: "none" }}>
      <StyledDataGridPremium
        pagination={pagination}
        hideFooter={!pagination}
        disableRowSelectionOnClick={true}
        rows={rows}
        columns={columns}        
        density={density}
        getRowId={(row) => (datagridName === 'DaysColumns'
          || datagridName === "weeklytimesheet" || datagridName === "pendingApprovalList") ? row.id : Math.random()}
        apiRef={apiRef}
        disableColumnMenu={disableColumnMenu}
        loading={loading}
        filterMode="client"
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          density: "standard"
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        headerFilters
        filterModel={filterModel}
        onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)} // Ensure this is updating properly
      />
    </Box>
  );
};

export default MuiDataGrid;
