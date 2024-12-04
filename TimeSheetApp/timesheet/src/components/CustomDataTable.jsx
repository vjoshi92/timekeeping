import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid2,
  styled,
  Box,
  TablePagination,
  Stack,
} from "@mui/material";
import { ApporvererActions, approverDataTableHeader } from "../mock/Landing";
import { useNavigate } from "react-router-dom";
import MuiMenuButton from "./MuiMenuButton";
import { StatusColorFormatter } from "../utils/AppUtil";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import DownloadIcon from "@mui/icons-material/Download";

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  fontSize: "14px",
}));

const StyledMainBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#009FE3",
  width: "100%",
  overflowX: "auto",
}));

const StyledInternalBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "1%",
}));

const SecondInternalBox = styled(Box)(({ theme }) => ({
  border: "1px solid #FFF",
  padding: "0.5rem",
  display: "flex",
  // flexDirection: 'column',
  // overflowX :"auto",
  gap: "1%",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  backgroundColor: "#FFFFFF",
  width: "100%",
  boxShadow: "0 0 0 0",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "400",
}));

const StyledHeadingData = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  whiteSpace: "nowrap", // Prevent text from wrapping
  paddingTop: "1%",
  fontSize: "13px",
  fontWeight: "700",
  textAlign: "start",
}));

const SecondStyledHeading = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap", // Prevent text from wrapping
  paddingTop: "1%",
  fontWeight: "700",
  fontSize: "12px",
  color: "#0073E6",
  textAlign: "start",
  cursor: "pointer",
}));

const ThirdStyledHeading = styled(Typography)(({ theme }) => ({
  whiteSpace: "nowrap", // Prevent text from wrapping
  paddingTop: "1%",
  fontWeight: "700",
  color: "#0073E6",
  textAlign: "start",
  cursor: "pointer",
  fontSize: "13px",
}));

const CustomDataTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  const [tablesCount, settablesCount] = useState();
  const [dataTable, setDataTable] = useState();

  // useEffect(() => {
  //   if (ApproversDetailsData) {
  //     setDataTable(ApproversDetailsData);
  //     settablesCount(ApproversDetailsData?.__count);
  //   }
  // }, [ApproversDetailsData]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the MYKPILIST data
  const paginatedData = dataTable?.results?.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEdit = (data, isEdit) => {
    navigate("/CapEx_Request/approver", {
      state: { id: data, isEdit, isApprover: true },
    });
  };
  return (
    <Box>
      <Box>
        <StyledMainBox>
          <Box sx={{ padding: 2, overflowX: "auto" }}>
            <Grid2 container spacing={1}>
              {approverDataTableHeader?.map((element) => (
                <Grid2
                  item
                  xs={element.xs}
                  sm={element.sm}
                  lg={element.lg}
                  xl={element.xl}
                  md={element.md}
                >
                  <StyledHeading>{element.label}</StyledHeading>
                </Grid2>
              ))}
            </Grid2>
          </Box>
        </StyledMainBox>
        {paginatedData?.map((TaskData, id) => {
          return (
            <StyledInternalBox key={id}>
              <StyledCard>
                <SecondInternalBox>
                  <Grid2
                    container
                    spacing={1}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={2}>
                      <StyledHeadingData>{TaskData?.Aufex}</StyledHeadingData>
                      <SecondStyledHeading
                        onClick={() => handleEdit(TaskData, true)}
                      >
                        {TaskData?.Zaufnr}
                      </SecondStyledHeading>
                    </Grid2>

                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={1.4}>
                      <ThirdStyledHeading
                        sx={{
                          fontSize: "13px",
                          fontWeight: "700",
                          color: StatusColorFormatter(TaskData?.Statusdesc),
                          textAlign: "left",
                        }}
                      >
                        {TaskData?.Statusdesc}
                      </ThirdStyledHeading>
                      <StyledHeadingData
                        sx={{
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        <StyledTypography>
                          ({TaskData.estimatedDate})
                        </StyledTypography>
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={1.4}>
                      <ThirdStyledHeading
                        sx={{
                          color: StatusColorFormatter(TaskData?.Statusdesc),
                          textAlign: "left",
                        }}
                      >
                        {TaskData?.Zaufnrstat}
                      </ThirdStyledHeading>
                      <StyledHeadingData
                        sx={{
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        <StyledTypography>
                          ({TaskData.estimatedDate})
                        </StyledTypography>
                      </StyledHeadingData>
                    </Grid2>

                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={2.1}>
                      <StyledHeadingData
                        sx={{
                          fontSize: "13px",
                          fontWeight: "500",
                          textAlign: "left",
                        }}
                      >
                        {TaskData?.Crnam}
                      </StyledHeadingData>
                      <StyledHeadingData
                        sx={{
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: "400",
                          }}
                        >
                          ({TaskData.Zappr1name})
                        </Typography>
                      </StyledHeadingData>
                    </Grid2>

                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={2.1}>
                      <StyledHeadingData
                        sx={{
                          textAlign: "left",
                        }}
                      >
                        {TaskData?.Totalvalue}
                      </StyledHeadingData>
                      <StyledHeadingData
                        sx={{
                          fontWeight: "400",
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "400",
                          }}
                        >
                          ($ {TaskData?.Totalvalue})
                        </Typography>
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} sm={12} lg={2} xl={2} md={2}>
                      <StyledHeadingData sx={{ textAlign: "left" }}>
                        <Stack direction={"row"}>
                          <MuiMenuButton options={ApporvererActions} />
                          <Box sx={{ marginTop: "3px" }}>
                            <RemoveRedEyeIcon
                              htmlColor="#005AA6"
                              sx={{
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                cursor: "pointer",
                              }}
                            />
                            <HistoryToggleOffIcon
                              htmlColor="#005AA6"
                              sx={{ paddingRight: "10px", cursor: "pointer" }}
                            />
                            <DownloadIcon
                              htmlColor="#005AA6"
                              sx={{ paddingRight: "10px", cursor: "pointer" }}
                            />
                          </Box>
                        </Stack>
                      </StyledHeadingData>
                    </Grid2>
                  </Grid2>
                </SecondInternalBox>
              </StyledCard>
            </StyledInternalBox>
          );
        })}
      </Box>
      <TablePagination
        component="div"
        count={tablesCount}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

export default CustomDataTable;
