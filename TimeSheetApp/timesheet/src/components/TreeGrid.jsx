import * as React from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { LicenseInfo } from "@mui/x-license";
import { useSelector } from "react-redux";
import { Box, Stack, Step, StepLabel, Stepper, styled, Tooltip, Typography } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid-premium";
import CustomPopover from "./CustomPopover";
import { useGetHierarchyDataQuery } from "api/timesheetApi";

const EmptyBox = styled(Typography)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const getTreeDataPath = (row) => {
  if (row.isTotal) return ["Total"];
  return row?.hierarchy;
};
// const steps = [
//   {
//     label: "JMA NOFO 2 O-RU",
//   },
//   {
//     label: "1.4 / Phase 2",
//   },
//   {
//     label: "1.4.10 / AT&T RU [XR35TWV4/ACT-O] C-Band 4x30W (Ph2)",
//   },
//   {
//     label: "1.4.10.2 / Design Implementation (Second Run)",
//   },
//   {
//     label: "1.4.10.2.1 / Mechanical Design",
//   },
// ];

const customStepper = (steps) => {
  // console.log("steps in custom stepper", steps);
  return (
    <Stepper orientation="vertical" activeStep={-1}>
      {steps.map((step, index) => (
        <Step key={step.Posid_up}>
          <StepLabel>
            <Typography sx={{ fontWeight: index === steps.length - 1 ? "bold" : "normal" }}>
              {/* {`${step.Posid_up} - ${step.Posid_up_Desc}`} */}
              {step.Posid_up_Desc}
            </Typography>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

const groupingColDef = (hierarchyData) => {
  return {
    headerName: "",
    pinnable: true,
    pinned: "left",
    minWidth: 180,
    flex: 1,
    renderCell: (params) => {
      // get level wise heirachi data
      const posId = params.row.level;
      let hData = [];
      let sortedSteps = [];
      if (hierarchyData?.results) {
        hData = hierarchyData?.results;
        let datas = [...hData];
        let heirachyDataforPosId = datas?.find(x => x.POSID == posId);
        let dataArray = [];
        if (heirachyDataforPosId?.WBSHIERLEVEL?.results) {
          const temp = heirachyDataforPosId?.WBSHIERLEVEL?.results;
          if (temp) {
            dataArray = [...temp];
          }
        }
        sortedSteps = dataArray?.sort((a, b) => a.Stufe - b.Stufe);
      }

      // ;

      return params.row.title ? (
        <Stack ml={"1rem"}>
          <CustomPopover content={customStepper(sortedSteps)}>
            <Tooltip title={params.row.smartId}>
              <Typography mt={"0.2rem"} fontSize={"0.9rem"} >
                {params.row.smartId}
              </Typography>
            </Tooltip>
          </CustomPopover>
          <CustomPopover content={customStepper(sortedSteps)}>
            <Tooltip title={params.row.title}>
              <Typography fontWeight={700} sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>{params.row.title}</Typography>
            </Tooltip>
          </CustomPopover>
        </Stack>

      ) : (
        <Typography mt={"1rem"} fontWeight={700} sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis"}}>
          {params.value}
        </Typography>
      );
    },
  }
};

const customStyles = {
  "& .MuiDataGrid-cell": {
    backgroundColor: "#FFFF",
  },
  "& .MuiDataGrid-columnSeparator": {
    color: "#CCC !important", // This will change the column divider color to green
  },
  "& .MuiDataGrid-columnHeaderTitle .Mui-groupHeader": {
    display: "none",
  },
  "& .MuiDataGrid-columnHeader": {
    color: "#121212DE",
    fontWeight: "700",
    fontSize: "14px",
    backgroundColor: "#EEEEEE",
  },
  "& .MuiOutlinedInput-input": {
    backgroundColor: "#FFFFFF",
  },
  "& .level-0": {
    color: "#121212DE",
    fontWeight: "700",
    marginRight: "20px",
  },
  "& .level-1, & .level-2": {
    color: "#0073E6DE",
    fontWeight: "400",
    marginRight: "20px",
  },
  "& .total-row": {
    backgroundColor: "#F0F0F0",
    fontWeight: "bold",
  }
};

const getRowClassName = (params) => {
  const level = params.row.hierarchy ? params.row.hierarchy.length - 1 : 0;
  return params.row.isTotal ? "total-row" : `level-${level}`;
};

LicenseInfo.setLicenseKey(
  "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
);

export default function TreeGrid({ columns, density, data }) {

  // get heirachy data
  const { data: heirachyData } = useGetHierarchyDataQuery();

  return (
    <Box sx={{ height: "60vh", width: "100%", border: "none" }}>
      <DataGridPro
        treeData
        rows={data}
        columns={columns}
        hideFooter
        density={density || "compact"}
        apiRef={useGridApiRef()}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={() => groupingColDef(heirachyData)}
        sx={customStyles}
        getRowClassName={getRowClassName}
        pinnedColumns={{ left: ["__tree_data__"] }}
        disableColumnMenu
        defaultGroupingExpansionDepth={-1}        
      />
    </Box>
  );
}

// const initialState = useKeepGroupedColumnsHidden({
//   apiRef,
//   initialState: {
// pinnedColumns: {
//   left: [
//     GRID_ROW_GROUPING_SINGLE_GROUPING_FIELD,
//     "project"
//   ]
// }
//   },
// });

// sx={{
//   "& .MuiDataGrid-cell": {
//     backgroundColor: "#FFFFFF", // Cell background color
//     color: "black", // Parent text color
//   },
//   "& .MuiDataGrid-cell:first-child": {
//     color: "blue", // First child text color
//   },
//   "& .MuiDataGrid-cell:last-child": {
//     color: "blue", // Last child text color, if needed
//   },
//   "& .MuiOutlinedInput-input": {
//     backgroundColor: "#FFFFFF", // Input background
//   },
//   "& .MuiDataGrid-columnHeaderTitle": {
//     display: "none",
//   },
//   "& .MuiDataGrid-columnHeader": {
//     backgroundColor: "#EEEEEE",
//     color: "black",
//     fontWeight: "700",
//     fontSize: "16px",
//   },
//   "& .MuiDataGrid-cell--textLeft": {
//     color: "black",
//     fontWeight: "700",
//     fontSize: "16px",
//   },
// }}

// import * as React from 'react';
// import { DataGridPro } from '@mui/x-data-grid-pro';
// import { LicenseInfo } from '@mui/x-license';
// import { useSelector } from 'react-redux';
// import { Box } from '@mui/material';
// import { DataGridPremium, useGridApiRef, useKeepGroupedColumnsHidden } from '@mui/x-data-grid-premium';
// import MuiDataGrid from './MuiDataGrid';

// LicenseInfo.setLicenseKey(
//   "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
// );

// export default function TreeGrid({ columns, density }) {
//   const projectedData = useSelector((state) => state?.CreateForm?.projectData);
//   console.log("projectedData" , projectedData)

//   return (
//     <MuiDataGrid
//       rows={projectedData}
//       columns={columns}
//       density={density || "compact"}
//       hideFooter
//     />
//   );
// }
