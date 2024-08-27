// src/Store/adminSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Admin {
    id: string;
    name: string;
    email: string;
    password: string;
}

export interface AdminAuthState {
    adminInfo: Admin | null;
    login: boolean;
}

const storedAdminInfo = localStorage.getItem('adminInfo');
const initialState: AdminAuthState = {
    adminInfo: storedAdminInfo ? JSON.parse(storedAdminInfo) as Admin : null,
    login: !!storedAdminInfo,
};

const adminSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setAdminCredentials: (state, action: PayloadAction<Admin>) => {
            state.adminInfo = action.payload;
            state.login = true;
            localStorage.setItem('adminInfo', JSON.stringify(action.payload));
        },
        adminLogout: (state) => {
            state.adminInfo = null;
            state.login = false;
            localStorage.removeItem('adminInfo');
        }
    }
});

export const { setAdminCredentials, adminLogout } = adminSlice.actions;
export default adminSlice.reducer;
