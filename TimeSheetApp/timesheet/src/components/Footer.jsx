import { Box, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column", 
  backgroundColor: "#FFFFFF",
  width: "97.5%",
  height: "auto", // Adjust height dynamically
  minHeight: "4rem", // Maintain minimum height
  borderRadius: "4px",
  padding: "20px",
  position: "absolute",
  bottom: 8,
  boxSizing: "border-box",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Adjust for larger screens
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export const Footer = (props) => {
  return <StyledBox>{props.children}</StyledBox>;
};


