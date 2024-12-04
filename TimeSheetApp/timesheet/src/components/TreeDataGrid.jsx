import React, { useEffect, useState } from "react";
import {
  DataGridPremium,
  useGridApiRef,
} from "@mui/x-data-grid-premium";
import { Box } from "@mui/material";
import { LicenseInfo } from "@mui/x-license";
import { useSelector } from "react-redux";

// Set license key
LicenseInfo.setLicenseKey(
  "25f2175523aa72e9d954ec0ef5a74461Tz05NjQ3MCxFPTE3NTU3MDU1NjQwMDAsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixQVj1pbml0aWFsLEtWPTI="
);

const TreeDataGrid = ({ columns, pagination = true, density = "standard", datagridName }) => {
  const apiRef = useGridApiRef();
  
  // Get project data from Redux
  const projectedData = useSelector((state) => state?.CreateForm?.projectData);
  const [projectDataArray, setProjectDataArray] = useState([]);

  // Update projectDataArray when new data comes in
  useEffect(() => {
    if (projectedData) {
      setProjectDataArray(prevData => {
        // Check if the new data already exists in the array
        const exists = prevData.some(item => item.id === projectedData.id);
        if (!exists) {
          return [...prevData, projectedData];
        }
        return prevData;
      });
    }
  }, [projectedData]);

  // Create rows from project data
  const createRowsFromProjectData = (dataArray) => {
    return dataArray.map((item, index) => {
      const baseRow = {
        id: item.id || `row-${index}`,
        ...item // Spread all other item properties
      };

      // Handle hierarchy
      if (item.hirarchy && Array.isArray(item.hirarchy) && item.hirarchy.length > 0) {
        return {
          ...baseRow,
          hierarchy: item.hirarchy,
          treeData: {
            group: false,
            expanded: true
          }
        };
      } else {
        return {
          ...baseRow,
          hierarchy: [item.project || `Project ${index + 1}`],
          treeData: {
            group: false
          }
        };
      }
    });
  };

  // Style configuration
  const customStyles = {
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
    "& .level-0": {
      color: "#121212DE",
      fontWeight: "700",
      marginRight: "20px"
    },
    "& .level-1, & .level-2": {
      color: "#0073E6DE",
      fontWeight: "400",
      marginRight: "20px"
    }
  };

  // Function to determine row class based on hierarchy level
  const getRowClassName = (params) => {
    const level = params.row.hierarchy ? params.row.hierarchy.length - 1 : 0;
    return `level-${level}`;
  };

  // Generate rows from projectDataArray
  const rows = createRowsFromProjectData(projectDataArray);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGridPremium
        rows={rows}
        columns={columns}
        density={density}
        treeData
        getTreeDataPath={(row) => row.hierarchy}
        sx={customStyles}
        getRowClassName={getRowClassName}
        pagination={pagination}
        hideFooter={!pagination}
        getRowId={(row) => datagridName === 'RowsDataColumns' ? row.id : `${row.id}-${Math.random()}`}
        apiRef={apiRef}
      />
    </Box>
  );
};

export default TreeDataGrid;