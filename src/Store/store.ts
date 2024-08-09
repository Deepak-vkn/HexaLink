// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/userSlice'; // Ensure the correct path
 import adminReducer from '../Store/adminSlice'; // Ensure the correct path
import companyReducer from '../Store/companySlice'
const store = configureStore({
    reducer: {
        user: userReducer,
        company:companyReducer,
        admin: adminReducer
    }, 
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
