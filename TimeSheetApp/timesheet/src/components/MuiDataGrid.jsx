import React from "react";
import {
  DataGridPremium,
  gridClasses,
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
    fontWeight: "700",
    fontSize: "16px"
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "#CCC !important", // This will change the column divider color to green
  },
});

const MuiDataGrid = ({ columns, rows, pagination, density, datagridName, disableColumnMenu }) => {
  LicenseInfo.setLicenseKey(
    "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
  );

  const apiRef = useGridApiRef();

  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ["id"],
      },
    },
  });

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  return (
    <StyledBox>
      <StyledDataGridPremium
        pagination={pagination}
        hideFooter={!pagination}
        rows={rows}
        columns={columns}
        autoHeight
        density={density || "compact"}
        getRowId={(row) => datagridName == 'DaysColumns' ? row.id : Math.random()}
        apiRef={apiRef}
        initialState={initialState}
        disableColumnMenu={disableColumnMenu}
      />
    </StyledBox>
  );
};

export default MuiDataGrid;

//---------------------------------------------------------------------------------------------------------------------

// import React from "react";
// import {
//   DataGridPremium,
//   gridClasses,
//   useGridApiRef,
//   useKeepGroupedColumnsHidden,
//   GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
// } from "@mui/x-data-grid-premium";
// import { darken, lighten } from "@mui/material/styles";
// import { Box, Stack, Typography } from "@mui/material";
// import { LicenseInfo } from "@mui/x-license";

// const getTreeDataPath = (row) => {
//   return row?.hierarchy && Array.isArray(row.hierarchy) ? row.hierarchy : [];
// };

// LicenseInfo.setLicenseKey(
//   "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
// );

// const MuiDataGrid = ({ columns, rows, pagination, density, datagridName, isEdit }) => {
  

//   const apiRef = useGridApiRef();

//   const initialState = useKeepGroupedColumnsHidden({
//     apiRef,
//     initialState: {
//       rowGrouping: {
//         model: ['project'],
//       },
//       pinnedColumns: {
//         left: [GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD, "project", "level"],
//       },
//     },
//   });
  

//   const getBackgroundColor = (color, mode) =>
//     mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

//   const getHoverBackgroundColor = (color, mode) =>
//     mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

//   return (
//     <Box
//       sx={{
//         overflowX: "auto",
//         width: "100%",
//       }}
//     >
//       <DataGridPremium
//         pagination={pagination}
//         hideFooter={!pagination}
//         sx={{
//           "& .MuiDataGrid-cell": {
//             backgroundColor: "#FFFFFF",
//           },
//           "& .MuiOutlinedInput-input": {
//             backgroundColor: "#FFFFFF",
//           },
        
//           "& .MuiDataGrid-columnHeader": {
//             backgroundColor: "#EEEEEE",
//             color: "#121212DE",
//             fontWeight: "700",
//             fontSize: "16px",
//           },
//         }}
//         rows={rows}
//         columns={columns}
//         initialState={initialState} 
//         autoHeight
//         density={density || "compact"}
//         getRowId={(row) => (datagridName === "DaysColumns" ? row?.id : Math?.random())}
//         apiRef={apiRef}
//         getTreeDataPath={getTreeDataPath}
//       />
//     </Box>
//   );
// };

// export default MuiDataGrid;
