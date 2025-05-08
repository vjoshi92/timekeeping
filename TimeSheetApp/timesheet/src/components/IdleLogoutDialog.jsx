// components/IdleLogoutDialog.jsx
import { Button, Dialog, DialogContent, DialogTitle, Stack } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetInactivityTimer } from 'store/inactivityMiddleware';
import { hideIdleLogoutDialog, logout } from 'store/slice/authSlice';
import WarningIcon from '@mui/icons-material/Warning';
import { useLazyGetUserDataQuery } from 'api/timesheetApi';

const IdleLogoutDialog = () => {
    const show = useSelector((state) => state.auth.showIdleDialog);
    const dispatch = useDispatch();
    const [getUserData, { data: userDetail, isFetching: isloadingUserData }] =
        useLazyGetUserDataQuery();

    const handleContinue = () => {
        getUserData();
        dispatch(hideIdleLogoutDialog());
        resetInactivityTimer(); // Reset the 24-min timer
    };

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <Dialog open={show} maxWidth="xs" fullWidth>
            <DialogTitle fontWeight={600} color='#000'>
                <Stack direction={"row"} alignItems={'center'} spacing={1}>
                    <WarningIcon color="secondary" />
                    <p>Session Expiring ...</p>
                </Stack>
            </DialogTitle>
            <DialogContent>
                <p>Your current session will expire in <b>one minute</b>. Please click "Continue" to keep working.</p>
                <Stack mt={"2rem"} direction={"row"} alignItems={'start'} justifyContent={'space-between'}>
                    <Button size='medium' variant='outlined' color='primary' onClick={handleLogout} >Logout</Button>
                    <Button size='medium' variant='contained' color='primary' onClick={handleContinue} >Continue</Button>
                </Stack>
            </DialogContent>
        </Dialog >
    );
};

export default IdleLogoutDialog;