import * as React from 'react';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { useGridApiRef } from '@mui/x-data-grid-premium';

const getTreeDataPath = (row) => {
  if (row.isTotal) return ['Total'];
  
  // Otherwise, use the existing hierarchy
  return row?.hierarchy;
};

const groupingColDef = {
  headerName: '',
  pinnable: true,
  pinned: 'left', 
};

const customStyles = {
  '& .MuiDataGrid-cell': {
    backgroundColor: '#FFFF',
  },
  '& .MuiDataGrid-columnHeaderTitle .Mui-groupHeader': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader': {
    color: '#121212DE',
    fontWeight: '700',
    fontSize: '16px',
    backgroundColor: '#EEEEEE',
  },
  '& .MuiOutlinedInput-input': {
    backgroundColor: '#FFFFFF',
  },
  '& .level-0': {
    color: '#121212DE',
    fontWeight: '700',
    marginRight: '20px',
  },
  '& .level-1, & .level-2': {
    color: '#0073E6DE',
    fontWeight: '400',
    marginRight: '20px',
  },
  '& .total-row': {
    backgroundColor: '#F0F0F0',
    fontWeight: 'bold',
  },
};

const getRowClassName = (params) => {
  const level = params.row.hierarchy ? params.row.hierarchy.length - 1 : 0;
  return params.row.isTotal ? 'total-row' : `level-${level}`;
};

LicenseInfo.setLicenseKey(
  '25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI='
);

export default function TreeGrid({ columns, density, data }) {
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);

  return (
    <Box style={{ height: "auto", width: '100%' }}>
      <DataGridPro
        treeData
        rows={data}
        columns={columns}
        hideFooter
        autoHeight
        density={density || 'compact'}
        apiRef={useGridApiRef()}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={groupingColDef}
        sx={customStyles}
        getRowClassName={getRowClassName}
        pinnedColumns={{ left: ['__tree_data__'] }}
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
