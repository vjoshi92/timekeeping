import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import CapexLogo from "../../img/jma-logo.svg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Avatar,
  Chip,
  Divider,
  Menu,
  MenuItem,
  Popper,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import logo from "../../img/jma-logo.svg";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { resetForm } from "../../store/slice/CreateFormSlice";
import MuiDrawer from "components/MuiDrawer";
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { setDateRange } from "store/slice/HomeSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const IconBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end"
});

const StyledBox = styled(Box)({
  // marginTop: "10px",
  padding: "20px"
});

const ApprovalStyledBox = styled(Stack)({
  display: "flex",
  justifyContent: "start",
  alignItems: "center",
  color: "#FFFFFF",
  cursor: "pointer",
  marginBottom:"0.5rem",
  marginTop: "0.5rem"
});

const AllStyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  color: "#FFFFFF",
  cursor: "pointer"
});

const HeadingTypography = styled(Typography)({
  flexGrow: 1,
  fontSize: "16px",
  fontWeight: "400",
  mt: 1,
});
const ApprovalsTypography = styled(Typography)({
  fontWeight: "500",
  fontSize: "22px",
  color: "#FFFFFF",
});

const AllTypography = styled(Typography)({
  fontWeight: "500",
  fontSize: "22px",
  color: "#FFFFFF"
});

const StyledTypography = styled(Typography)({
  fontWeight: "500",
  fontSize: "16px",
  color: "#BDBDBD",
  marginBottom: "10px"
});

const StyledDivider = styled(Divider)({
  // mr: 1,
  borderColor: "white",
  height: "30px",
  mt: 10,
});
const StyledDrawerDivider = styled(Divider)({
  mr: 1,
  mb: 2,
  borderColor: "white",
  height: "1px",
});

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "static",
  background: "linear-gradient(to right, #005AA6, #0A2240)",
  // height: "50px",
  justifyContent: "center",
  // px: { xs: 1, sm: 2 },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#ED6A15",
  color: "#fff",
  marginLeft: "0.4rem"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const TextTypography = styled(Typography)({
  fontWeight: "500",
  fontSize: "16px",
  color: "#BDBDBD",
  paddingLeft: "15px"
});

export default function Header() {
  const [searchValue, setSearchValue] = React.useState("");
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [dataTable, setDataTable] = React.useState([]);
  const [details, setDetails] = React.useState([]);
  const [drawer, setDrawer] = React.useState(false)
  const navigate = useNavigate();
  const userData = useSelector((state) => state.home.userDetails);
  const dispatch = useDispatch();
  const params = useParams();
  const isManager = true;

  const settings = ["Welcome Vijay Joshi", "Logout"];
  // const handleCreateNew = () => {
  //   dispatch(resetForm());
  //   navigate("/CapEx_Request");
  // };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawer = () => {
    setDrawer(true)
  }

  const handleClose = () => {
    setDrawer(false)
  }

  const handleCurrentWeekClick = () => {
    const startOfCurrentWeek = dayjs().startOf('week').add(1, 'day');
    const endOfCurrentWeek = dayjs().endOf('week').add(1, 'day');
    const formattedDateRange = `${startOfCurrentWeek.format('DD MMM YYYY')} - ${endOfCurrentWeek.format('DD MMM YYYY')}`;
    dispatch(setDateRange(formattedDateRange));
    handleClose();
  };

  const handleMenuItemClick = (setting) => {
    if (setting === "Logout") {
      // handleLogout(); // Perform logout action
    }
    handleCloseUserMenu();
  };
  // const CustomPopper = (props) => {
  //   return (
  //     <Popper {...props} placement="bottom-start" sx={{ width: "30vw" }}>
  //       {searchValue && dataTable?.length > 0 ? (
  //         <Box sx={{ p: 2, backgroundColor: "white", width: "100vw" }}>
  //           <Typography variant="h6">Search Results</Typography>
  //           {dataTable
  //             .filter((option) =>
  //               option?.Aufex?.toLowerCase().includes(searchValue.toLowerCase())
  //             )
  //             .map((item, index) => (
  //               <Box key={index}>
  //                 <Typography variant="body1">
  //                   {item.Aufex} / {item.Aufnr}
  //                 </Typography>
  //               </Box>
  //             ))}
  //         </Box>
  //       ) : (
  //         props.children
  //       )}
  //     </Popper>
  //   );
  // };
  return (
    <Box sx={{ flexGrow: 1, justifyContent: "center" }}>
      <StyledAppBar>
        <Toolbar>
          <img
            src={CapexLogo}
            alt="Logo"
            loading="lazy"
            onClick={() => navigate("/home")}
            style={{
              cursor: "pointer",
              marginRight: "10px",
              marginBottom: "10px",
              width:"4rem"
            }}
          />

          <StyledDivider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              display: { sm: "block" },
              marginX: "12px",
              marginY: "20px"
            }}
          />

          <HeadingTypography
            variant="h6"
            component="div"
            sx={{
              display: { sm: "block" },
              marginLeft: "10px", // Adjusted for equal spacing
            }}
          >
            CATS 2.0
          </HeadingTypography>

          <IconButton aria-label="delete" sx={{ color: "white", marginRight:"1rem" }} onClick={() => handleDrawer()} >
            <MenuIcon fontSize="large" />
          </IconButton>

          <Tooltip title="Open settings">
            <IconButton
              size="small"
              onClick={handleOpenUserMenu}
              sx={{
                width: { xs: "25px", sm: "30px" },
                height: { xs: "25px", sm: "30px" },
              }}
            >
              <Avatar
                alt={userData?.Fullname}
                src="/static/images/avatar/2.jpg"
              />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "35px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting, index) => (
              <MenuItem
                key={index}
                onClick={() => handleMenuItemClick(setting)}
              >
                {setting}
              </MenuItem>
            ))}
          </Menu>

          <MuiDrawer
            open={drawer}
            handleClose={handleClose}
            resizable={true}
          // minWidth={"720px"}
          >
            <IconBox >
              <CloseIcon sx={{ cursor: "pointer", marginRight: "10px", color: "#FFFF", marginTop: "10px" }} onClick={() => setDrawer(false)} />
            </IconBox>
            {
              isManager == true ?
                <Box sx={{ padding: "20px" }}>

                  <StyledTypography >MY TIMESHEETS</StyledTypography>
                  <ApprovalStyledBox direction={"row"}
                    onClick={handleCurrentWeekClick}
                  >
                    <ApprovalsTypography >
                      Current Week
                    </ApprovalsTypography>

                  </ApprovalStyledBox>
                  <AllStyledBox onClick={() => { navigate("/AllTimesheet/false"); handleClose(); }}>
                    <ApprovalsTypography>
                      All
                    </ApprovalsTypography>
                  </AllStyledBox>
                </Box>
                : null
            }
            <StyledDrawerDivider
              orientation="horizontal"
              variant="middle"

            />
            <StyledBox >
              <StyledTypography>
                MY TEAMS'S TIMESHEETS
              </StyledTypography>
              <ApprovalStyledBox direction={"row"}
                onClick={() => { navigate("/pendingApprovals"); handleClose(); }}
              >
                <ApprovalsTypography >
                  Pending Approvals
                </ApprovalsTypography>
                <StyledChip label="5" variant="filled" sx={{}} />
              </ApprovalStyledBox>
              <AllStyledBox
                onClick={() => { navigate("/AllTimesheet/true"); handleClose(); }}>
                <AllTypography >All</AllTypography>
              </AllStyledBox>
            </StyledBox>

          </MuiDrawer>
        </Toolbar>
      </StyledAppBar>
    </Box>
  );
}
