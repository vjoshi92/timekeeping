import React from "react";
import { Box, Typography, Stack, styled } from "@mui/material";
import PropTypes from "prop-types";
import { useParams } from "react-router";

const MainBox = styled(Box)(() => ({
  marginTop: "15rem",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "5px",
  height: "100%",
}));
const MainTitle = styled(Typography)(() => ({
  marginLeft: "10px",
  fontWeight: 400,
  lineHeight: "64px",
  letterSpacing: "0.15px",
}));
const MessageBox = styled(Box)(() => ({
  padding: "2rem",
  borderLeftColor: "rgba(221, 19, 63, 0.71)",
  borderLeftStyle: "solid",
  borderLeftWidth: "10px",
  borderRadius: "5px",
  backgroundColor: "rgba(221, 19, 63, 0.06)",
  borderColor: "1px solid rgba(0, 0, 0, 0.22)",
  borderWidth: "0.5rem",
}));
const MessageText = styled(Typography)(() => ({
  fontWeight: 400,
  letterSpacing: "0.15px",
}));

const MessagePage = (props) => {
  let params = useParams();
  const code = params?.code;
  const getPageName = (code) => {
    if (code == "reviewPage") {
      return "Review Timesheet";
    }
  };

  const getMessageDetails = (code) => {
    switch (code) {
      case "reviewPage":
        return {
          title: "Access Denied",
          message: (
            <p>
              You do not have permission to access the {getPageName(code)} page.{" "}
              <br /> If you believe you are receiving this message in error or
              need to gain access,
              <br /> please contact your system administrator.
            </p>
          ),
        };
      default:
        return {
          title: "",
          message: "",
        };
    }
  };

  const title = getMessageDetails(code).title,
    message = getMessageDetails(code).message;

  return (
    <>
      <Stack alignItems={"center"} justifyContent="center">
        <MainBox>
          <Stack direction="row">
            <MainTitle variant="h4">{title}</MainTitle>
          </Stack>

          <MessageBox>
            <MessageText variant="subtitle1" color="text.secondary">
              {message}
            </MessageText>
          </MessageBox>
        </MainBox>
      </Stack>
    </>
  );
};

MessagePage.propTypes = {
  match: PropTypes.object,
};

export default MessagePage;
