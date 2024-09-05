// src/Store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/userSlice'; 
import adminReducer from '../Store/adminSlice'; 
import companyReducer from '../Store/companySlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        company: companyReducer,
        admin: adminReducer
    },

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
