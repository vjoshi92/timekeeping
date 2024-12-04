import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid2,
  styled,
  Box,
  Button,
  TablePagination,
  Badge,
  Stack,
} from "@mui/material";
import {
  ApporvererActions,
  approverDataTableHeader,
  MYKPILIST,
  originatorDataTableHeader,
} from "../mock/Landing";
import SplitButton from "./SplitButton";
import { Add, ViewStream } from "@mui/icons-material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReplayIcon from "@mui/icons-material/Replay";
import CustomBadge from "./CustomBadge";
import { useNavigate } from "react-router-dom";
import MuiDrawer from "./MuiDrawer";

const StyledHeading = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  whiteSpace: "nowrap",
  fontSize: "14px",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "1%",
}));

const ExternalBox = styled(Box)(({ theme }) => ({
  border: "1px solid #FFF",
  padding: "1%",
  display: "flex",
  // flexDirection: 'column',
  // overflowX :"auto",
  gap: "1%",
}));

const HeaderStyledBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#009FE3",
  width: "100%",
  overflowX: "auto",
}));
const HeaderInternalStyledBox = styled(Box)(({ theme }) => ({
  padding: 14,
  overflowX: "auto",
}));

const internalStyledBox = styled(Box)(({ theme }) => ({
  // border: "1px solid #FFF",
  padding: "1%",
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

const StyledGrid = styled(Grid2)(({ theme }) => ({
  display: "flex",

  flexWrap: "wrap",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#005AA6",
  color: "white",
  textTransform: "none",
  fontSize: "13px",
  ".MuiButton-startIcon": {
    marginLeft: "-4px !important",
  },
}));

const SecondStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#005AA6",
  color: "white",
  textTransform: "none",
  ":hover": {
    backgroundColor: "#10177A",
  },
}));

const ThirdStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#005AA6",
  width: "110px",
  color: "white",
  fontSize: "13px",
  textTransform: "none",
  ":hover": {
    backgroundColor: "#10177A",
  },
}));

const FourthStyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#005AA6",
  padding: "3.5px",
  color: "white",
  display: "flex",
  justifyContent: "center",
  textTransform: "none",
  alignItems: "center",
  fontSize: "13px",
  ":hover": {
    backgroundColor: "#10177A",
  },
}));

const NotificationOption = ({ notification, request }) => (
  <Box sx={{ display: "flex", alignItems: "center" }}>
    <Typography
      sx={{
        backgroundColor: "blue",
        color: "white",
        padding: "4px 8px",
        borderRadius: "4px",
        marginRight: "8px",
      }}
    >
      {notification}
    </Typography>
    <Typography>{request}</Typography>
  </Box>
);

const StyledHeadingData = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
  paddingTop: "1%",
  fontSize: "13px",
  fontWeight: "400",
  textAlign: "start",
  fontSize: "13px",
  fontWeight: "700",
  textAlign: "start",
  whiteSpace: "normal",
  wordWrap: "break-word",
}));

const StyledMainBox = styled(Box)(({ theme }) => ({
  borderRadius: "10px",
  backgroundColor: "#009FE3",
  width: "100%",
  overflowX: "auto",
}));

const SecondStyledHeadingData = styled(Typography)(({ theme }) => ({
  // color: theme.palette.common.black,
  fontWeight: "bold",
  textAlign: "center",
  whiteSpace: "nowrap",
  paddingTop: "1%",
  fontSize: "13px",
  fontWeight: "400",
  textAlign: "start",
  fontWeight: "700",
  fontSize: "12px",
  color: "#0073E6",
  cursor: "pointer",
  whiteSpace: "normal",
  wordWrap: "break-word",
}));

const ThirdStyledHeadingData = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.black,
  fontWeight: "bold",
  whiteSpace: "nowrap",
  paddingTop: "1%",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
  textAlign: "start",
}));
const PendingTypography = styled(Typography)(({ theme }) => ({
  fontSize: "13px",
  fontWeight: "700",
  textAlign: "start",
}));

const IOTypography = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "400",
  textAlign: "start",
}));

const DataTable = ({
  data,
  count,
  setRowsPerPage,
  rowsPerPage,
  skip,
  page,
  setPage,
}) => {
  // const [page, setPage] = useState(0);
  const [openPrDrawer, setOpenPrDrawer] = useState(false);
  const [openPoDrawer, setOpenPoDrawer] = useState(false);
  const [openReceivedGoodsDrawer, setOpenReceivedGoodsDrawer] = useState(false);
  const [prKpi, setPrkpi] = useState();
  const [poData, setPoData] = useState();
  const [selectedData, setSelectedData] = useState(null);
  const [selectedPoData, setSelectedPoData] = useState(null);
  const [selectedGoodsData, setSelectedGoodsData] = useState(null);
  const navigate = useNavigate();
  // const skip = page * rowsPerPage;

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Paginate the MYKPILIST data
  const paginatedData = data?.results?.slice(skip, skip + rowsPerPage);

  const handleEdit = (data, isEdit) => {
    navigate(`/CapEx_Request/${data?.Zaufnr}`, { state: { isEdit } });
  };

  const onClickPR = (data) => {
    setSelectedData(data);
    setOpenPrDrawer(!openPrDrawer);
  };

  const handlePurchaseOrders = (podata) => {
    setSelectedPoData(podata);
    setOpenPoDrawer(!openPoDrawer);
  };
  const handleReceiveOrders = (goodsData) => {
    setSelectedGoodsData(goodsData);
    setOpenReceivedGoodsDrawer(!openReceivedGoodsDrawer);
  };

  return (
    <Box>
      <Box>
        <StyledMainBox>
          <Box sx={{ padding: 2, overflowX: "auto" }}>
            <Grid2 container spacing={1}>
              {originatorDataTableHeader?.map((element, index) => (
                <Grid2
                  key={index}
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
            <StyledBox key={id}>
              <StyledCard>
                <ExternalBox>
                  <StyledGrid container spacing={1}>
                    <Grid2 item sm={12} xs={12} lg={1.5} xl={1.6} md={1.5}>
                      <StyledHeadingData>{TaskData?.Aufex}</StyledHeadingData>
                      <SecondStyledHeadingData
                        onClick={() => handleEdit(TaskData, true)}
                      >
                        {TaskData?.Zaufnr}
                      </SecondStyledHeadingData>
                    </Grid2>
                    <Grid2 item sm={12} xs={12} lg={1.5} xl={1.4} md={1.3}>
                      <ThirdStyledHeadingData>
                        {TaskData?.Totalvalue}
                      </ThirdStyledHeadingData>
                      <StyledHeadingData>
                        {TaskData?.subValue ? (
                          <Typography
                            sx={{
                              fontSize: "13px",
                              fontWeight: "400",
                            }}
                          >
                            ({TaskData.subValue})
                          </Typography>
                        ) : null}
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} md={1.5} lg={1.5} xl={1.5}>
                      <StyledHeadingData sx={{ textAlign: "start" }}>
                        {TaskData?.reworkRequest ? (
                          <StyledButton
                            size="small"
                            variant="contained"
                            startIcon={<ReplayIcon />}
                          >
                            Rework Request
                          </StyledButton>
                        ) : (
                          "--"
                        )}
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} md={1.7} sm={12} lg={1.6} xl={1.5}>
                      <StyledHeadingData>
                        {TaskData?.Banfn !== null ? (
                          <>
                            <PendingTypography
                              sx={{
                                color:
                                  TaskData?.Cpstatusdesc === "In progress"
                                    ? "#ED6A15"
                                    : TaskData?.Cpstatusdesc === "Approved"
                                    ? "#41AF6E"
                                    : TaskData?.Cpstatusdesc === "Rejected"
                                    ? "#DD133F"
                                    : "inherit",
                              }}
                            >
                              {TaskData?.Cpstatusdesc}
                            </PendingTypography>
                            <IOTypography>IO ({TaskData?.Banfn})</IOTypography>
                          </>
                        ) : (
                          <IOTypography>IO (--)</IOTypography>
                        )}
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} md={2.2} sm={12} lg={2.1} xl={2}>
                      <StyledHeadingData sx={{ textAlign: "start" }}>
                        {TaskData?.PurchaseRequests ? (
                          <Box>
                            <Box>
                              <SplitButton
                                options={TaskData?.PurchaseRequests}
                              />
                            </Box>
                          </Box>
                        ) : (
                          <SecondStyledButton
                            size="small"
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => onClickPR(TaskData)}
                          >
                            Create PR
                          </SecondStyledButton>
                        )}
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} md={2} sm={12} lg={2} xl={2}>
                      <StyledHeadingData
                        sx={{ textTransform: "none", textAlign: "start" }}
                      >
                        {TaskData?.PoCount ? (
                          "--"
                        ) : (
                          <CustomBadge count={2}>
                            <ThirdStyledButton
                              size="small"
                              variant="outlined"
                              startIcon={<ViewStream />}
                              onClick={() => handlePurchaseOrders(TaskData)}
                            >
                              View POs
                            </ThirdStyledButton>
                          </CustomBadge>
                        )}
                      </StyledHeadingData>
                    </Grid2>
                    <Grid2 item xs={12} md={1.8} sm={12} lg={1.5} xl={2}>
                      <StyledHeadingData
                        sx={{ textTransform: "none", textAlign: "start" }}
                      >
                        {TaskData?.goodsCount ? (
                          "--"
                        ) : (
                          <CustomBadge count={2}>
                            <FourthStyledButton
                              size="small"
                              variant="outlined"
                              startIcon={<ReceiptIcon />}
                              onClick={() => handleReceiveOrders(TaskData)}
                            >
                              Receive Goods
                            </FourthStyledButton>
                          </CustomBadge>
                        )}
                      </StyledHeadingData>
                    </Grid2>
                  </StyledGrid>
                </ExternalBox>
              </StyledCard>
            </StyledBox>
          );
        })}
      </Box>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {/* {openPrDrawer ? (
        <MuiDrawer
          open={openPrDrawer}
          handleClose={() => setOpenPrDrawer(false)}
          resizable={true}
          minWidth={"720px"}
        >
          <PrOrders
            handleClose={() => setOpenPrDrawer(false)}
            selectedData={selectedData}
          />
        </MuiDrawer>
      ) : null} */}
      {/* {openPoDrawer ? (
        <MuiDrawer
          open={openPoDrawer}
          handleClose={() => setOpenPoDrawer(false)}
          resizable={true}
          minWidth={"720px"}
        >
          <PoOrders
            handleClose={() => setOpenPoDrawer(false)}
            selectedPoData={selectedPoData}
          />
        </MuiDrawer>
      ) : null} */}
      {/* {openReceivedGoodsDrawer ? (
        <MuiDrawer
          open={openReceivedGoodsDrawer}
          handleClose={() => setOpenReceivedGoodsDrawer(false)}
          resizable={true}
          minWidth={"720px"}
        >
          <ReceivedGoods
            handleClose={() => setOpenReceivedGoodsDrawer(false)}
            selectedGoodsData={selectedGoodsData}
          />
        </MuiDrawer>
      ) : null} */}
    </Box>
  );
};

export default DataTable;
