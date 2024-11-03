// src/axiosConfig.ts
import axios from 'axios';
import store from '../Store/store'; // Import the default export
import { logout,setCredentials } from '../Store/userSlice';
import { companyLogout } from '../Store/companySlice';
import {  adminLogout } from '../Store/adminSlice';
const axiosInstance = axios.create({
 // baseURL:'https://gsnj8j5b-5001.inc1.devtunnels.ms/',
  //  baseURL: 'http://localhost:3000',
  baseURL: 'https://api.hexalink.depk.shop',
  withCredentials:true
});

axiosInstance.interceptors.response.use(
  (response) => {
  
    if (response.data && response.data.token === false) {
      console.log('user tokn faield at axios')
      switch (response.data.role) {
        case 'user':
          store.dispatch(logout());
          break;
        case 'company':
          store.dispatch(companyLogout());
          break;
        case 'admin':
          store.dispatch(adminLogout());
          break;
        default:
          store.dispatch(logout()); 
          break;
      }
      window.location.href = '/';
    }

    if (response.data && response.data.user) {
      store.dispatch(setCredentials(response.data.user));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        window.location.href = `/error?code=400`;
      } else if (status === 401) {
        window.location.href = '/';
      } else if (status === 403) {
        window.location.href = `/error?code=403`;
      } else if (status === 404) {
        window.location.href = `/error?code=404`;
      } else if (status >= 500) {
        window.location.href = `/error?code=500`;
      }
    }
  
    return Promise.reject(error);
  }
  
);

export default axiosInstance;
