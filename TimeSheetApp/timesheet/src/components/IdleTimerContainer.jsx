import React, { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { useLazyGetUserDataQuery } from "api/timesheetApi";

const IdleTimerContainer = () => {

  const [getUserData, { data: userDetail, isFetching: isloadingUserData }] =
    useLazyGetUserDataQuery();
  /**
 * we need to keep the prompt open for 1 minute. as per the requirement we need to wait for 10 min (configured in BE) then do auto logout
 * so at 9th minute we need to open prompt to notify user that auto logout will be triggered
 * so here we are hard coding the promt opening time to 1 minute
 * prompt will be auto closed by the Idle timer library
 */
  const timeoutValue = 24 * 60 * 1000; // converting minutes to milli seconds  
  const promptValue = 1 * 60 * 1000; // converting minutes to milli seconds  
  const [sessionExp, SetSessionExp] = useState(false);
  // event handler for prompt open event
  const onPrompt = () => {
    SetSessionExp(true);
  };
  // event handler for idle event
  const onIdle = () => {
    handleLogout();
  };

  const handleContinue = () => {
    getUserData();
    SetSessionExp(false);
    idleTimer.reset();
  };

  const handleLogout = () => {
    window.location.href = "my/logout";
  }

  /**
   * Idle timer npm package is used to manage the auto logout functionality
   * link: https://www.npmjs.com/package/react-idle-timer
   */
  const idleTimer = useIdleTimer({
    onPrompt,
    onIdle,
    timeout: timeoutValue,
    promptTimeout: promptValue,
    events: [
      "mousemove",
      "keydown",
      "wheel",
      "DOMMouseScroll",
      "mousewheel",
      "mousedown",
      "touchstart",
      "touchmove",
      "MSPointerDown",
      "MSPointerMove",
      "visibilitychange",
    ],
    immediateEvents: [],
    debounce: 0,
    onMessage: () => { },
    throttle: 0,
    eventsThrottle: 200,
    element: document,
    startOnMount: true,
    startManually: false,
    stopOnIdle: true,
    crossTab: true,
    name: "idle-timer",
    syncTimers: 1,
    leaderElection: false,
  });

  return (
    <Dialog open={sessionExp} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={600} color='#000'>
        <Stack direction={"row"} alignItems={'center'} spacing={1}>
          <WarningIcon color="warning" />
          <p>Session Expiring ...</p>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <p>Your current session will expire in <b>one minute</b>. Please click "Continue" to keep working.</p>
        <Stack mt={"2rem"} direction={"row"} alignItems={'start'} justifyContent={'space-between'}>
          <Button size='medium' variant='outlined' color='warning' onClick={handleLogout} >Logout</Button>
          <Button size='medium' variant='contained' color='warning' onClick={handleContinue} >Continue</Button>
        </Stack>
      </DialogContent>
    </Dialog >

  );
};

export default IdleTimerContainer;
