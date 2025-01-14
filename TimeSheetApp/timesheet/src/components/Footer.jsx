import { Box, Paper, styled } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#FFFFFF",
  width: "100%",
  height: "auto", // Adjust height dynamically
  // minHeight: "2.5rem", // Maintain minimum height
  borderRadius: "4px",
  padding: "0.7rem",
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "absolute",
  bottom: 1,
  boxSizing: "border-box",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row", // Adjust for larger screens
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export const Footer = (props) => {
  return <Paper
    sx={{
      marginTop: "calc(10% + 60px)",
      position: "fixed",
      bottom: 0,
      width: "100%",
    }}
    component="footer"
    square
    variant="outlined"
  >
    <StyledBox>{props.children}</StyledBox>
  </Paper>;
};
