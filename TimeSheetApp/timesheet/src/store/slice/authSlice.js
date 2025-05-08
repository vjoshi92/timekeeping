// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: true,
        showIdleDialog: false,
    },
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.showIdleDialog = false;
            window.location.href = "my/logout";
        },
        showIdleLogoutDialog: (state) => {
            state.showIdleDialog = true;
        },
        hideIdleLogoutDialog: (state) => {
            state.showIdleDialog = false;
        },
    },
});

export const { logout, showIdleLogoutDialog, hideIdleLogoutDialog } = authSlice.actions;
export default authSlice.reducer;
