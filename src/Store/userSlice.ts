// src/Store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the User interface
// src/Store/userSlice.ts
export interface User {
    _id: string;
    name: string;
    number: number;
    email: string;
    password: string;
    is_verified: boolean;
    joinedAt: Date;
    is_block: boolean;
    jobs: string[];
    workStatus?: string;
    about?: string;
    role?: string;
    skills?: string[]; 
    git?: string;
    education?: {
        degree?: string;
        institution?: string;
        year?: number;
    };
    status?: boolean;
    image?: string;
}


export interface AuthState {
    userInfo: User | null;
    login: boolean;
}

const storedUserInfo = localStorage.getItem('userInfo');
const initialState: AuthState = {
    userInfo: storedUserInfo ? JSON.parse(storedUserInfo) as User : null,
    login: !!storedUserInfo,
};

const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<User>) => {
            state.userInfo = action.payload;
            state.login = true;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            state.login = false;
            localStorage.removeItem('userInfo');
        }
    }
});

export const { setCredentials, logout } = userSlice.actions;
export default userSlice.reducer;
