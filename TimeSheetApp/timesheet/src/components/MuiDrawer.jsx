import React, { useEffect, useState, useCallback } from "react";
import { Drawer, Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import styled from "@emotion/styled";

const StyledBox = styled(Box)(({ theme }) => ({
  width: "5px",
  cursor: "ew-resize",
  padding: "4px 0 0",
  position: "absolute",
  top: "50%",
  left: "-5px",
  bottom: 0,
  zIndex: 100,
}));

// hook
const useResize = ({ minWidth }) => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(minWidth);

  const enableResize = useCallback(() => {
    setIsResizing(true);
  }, [setIsResizing]);

  const disableResize = useCallback(() => {
    setIsResizing(false);
  }, [setIsResizing]);

  const resize = useCallback(
    (e) => {
      if (isResizing) {
        const newWidth =
          document.body.offsetLeft + document.body.offsetWidth - e.clientX;
        if (newWidth > minWidth) {
          setWidth(newWidth);
        }
      }
    },
    [minWidth, isResizing, setWidth]
  );

  useEffect(() => {
    document.addEventListener("mousemove", resize);
    document.addEventListener("mouseup", disableResize);

    return () => {
      document.removeEventListener("mousemove", resize);
      document.removeEventListener("mouseup", disableResize);
    };
  }, [disableResize, resize]);

  return { width, enableResize };
};

const MuiDrawer = ({
  open,
  children,
  handleClose,
  minWidth = 600,
  resizable,
}) => {
  const { width, enableResize } = useResize({ minWidth });
  return (
    <Drawer
      open={open}
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: "100%", md: width }, 
          backgroundColor: "#0159A3",
        },
      }}
      onClose={handleClose}
    >
      {resizable && (
        <StyledBox onMouseDown={enableResize}>
          <DragIndicatorIcon color="primary" />
        </StyledBox>
      )}
      {children}
    </Drawer>
  );
};

export default MuiDrawer;
