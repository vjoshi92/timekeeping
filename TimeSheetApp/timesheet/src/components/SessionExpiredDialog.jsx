import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SessionExpiredDialog = ({ open, onClose, handleLogout }) => {
    const logout = () => {
        onClose();
        window.location.href = "my/logout";
    };

    return (
        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogTitle fontWeight={600} color='#ED6A15'>Session Expired</DialogTitle>
            <DialogContent>
                <p>Your session has expired. Please refresh the page.</p>
            </DialogContent>
            <DialogActions>
                <Button color='error' variant='outlined' onClick={logout}>Logout</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SessionExpiredDialog;
