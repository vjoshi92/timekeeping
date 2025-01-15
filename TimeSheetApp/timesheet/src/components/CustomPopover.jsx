import React, { useState } from "react";
import { Popper, Paper, Box, ClickAwayListener } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledPopper = styled(Popper)(({ theme }) => ({
  zIndex: 1300,
  "& .MuiPaper-root": {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    borderRadius: theme.shape.borderRadius,
    maxWidth: 600,
  },
}));
const CustomPopover = ({ children, content }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    setOpen(false);
  };

  const onClickAway = () => {
    setOpen(false);
  };
  return (
    <>
      <Box
        onClick={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ display: "inline-block" }}
        ClickAwayListener={onClickAway}
      >
        {children}
      </Box>
      <StyledPopper
        open={open}
        anchorEl={anchorEl}      
        placement="bottom"
        modifiers={[
          // {
          //   name: "offset",
          //   options: {
          //     offset: [0, 15],
          //   },
          // },
          {
            name: "flip",
            options: {
              fallbackPlacements: ["left-start", "top", "bottom"],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: window,
              padding: 8,
            },
          },
          {
            name: "arrow",
            enabled: false,
          },
        ]}
      >
        <Paper elevation={3}>{content}</Paper>
      </StyledPopper>
    </>
  );
};

export default CustomPopover;
