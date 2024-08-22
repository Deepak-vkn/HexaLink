// src/Store/companySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Company interface
export interface Company {
    _id: string;
    name: string;
    number: number;
    email: string;
    password: string;
    address: string;
    is_verified: boolean;
}

// Define the CompanyAuthState interface
export interface CompanyAuthState {
    companyInfo: Company | null;
    login: boolean;
}

const storedCompanyInfo = localStorage.getItem('companyInfo');
const initialState: CompanyAuthState = {
    companyInfo: storedCompanyInfo ? JSON.parse(storedCompanyInfo) as Company : null,
    login: !!storedCompanyInfo,
};

const companySlice = createSlice({
    name: 'companyAuth',
    initialState,
    reducers: {
        setCompanyCredentials: (state, action: PayloadAction<Company>) => {
            state.companyInfo = action.payload;
            state.login = true;
            localStorage.setItem('companyInfo', JSON.stringify(action.payload));
        },
        companyLogout: (state) => {
            state.companyInfo = null;
            state.login = false;
            localStorage.removeItem('companyInfo');
        }
    }
});

export const { setCompanyCredentials, companyLogout } = companySlice.actions;
export default companySlice.reducer;

