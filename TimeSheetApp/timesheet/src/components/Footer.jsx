import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#FFFFFF",
  width: "100%",
  height: "4rem",
  borderRadius: "4px",
  // marginTop: "30px",
  padding: "20px",
  position: "sticky",
  bottom: 0,
  boxSizing: "border-box",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
}));

const Footer = (props) => {
  return <StyledBox>{props.children}</StyledBox>;
};

export default Footer;
