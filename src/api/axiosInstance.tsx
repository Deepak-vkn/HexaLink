// src/axiosConfig.ts
import axios from 'axios';
import store from '../Store/store'; // Import the default export
import { setCredentials } from '../Store/userSlice';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001',
  withCredentials:true
});

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
  
    if (response.data && response.data.user) {
      
      store.dispatch(setCredentials(response.data.user));
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
