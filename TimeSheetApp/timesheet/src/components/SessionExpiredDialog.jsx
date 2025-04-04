import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const SessionExpiredDialog = ({ open, onClose, handleLogout }) => {
    const handleReload = () => {
        // handleLogout();
        window.location.reload(); // Reload the app
        onClose();
    };

    return (
        <Dialog open={open} maxWidth="xs" fullWidth>
            <DialogTitle>Session Expired</DialogTitle>
            <DialogContent>
                <p>Your session has expired. Please refresh the page.</p>
            </DialogContent>            
        </Dialog>
    );
};

export default SessionExpiredDialog;
