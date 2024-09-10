import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyToken } from '../../api/admin/get'; 
import { RootState } from '../../Store/store';
import {  adminLogout } from '../../Store/adminSlice'; 

const AdminMiddleware = () => {
  const [tokenValid, setTokenValid] = useState<boolean | null>(null); 
  const login = useSelector((state: RootState) => state.admin.login); 
  const dispatch = useDispatch();

  useEffect(() => {
   
    const verifyTokenn = async () => {
      try {
        const response = await verifyToken();  

        if (response?.token) {  
          console.log('Admin token validated');
          setTokenValid(true); 
        } else {
          console.log('Admin token invalid');
          setTokenValid(false); 
          dispatch(adminLogout()); 
        }
      } catch (error) {
        console.error('Token verification failed', error);
        setTokenValid(false);
        dispatch(adminLogout()); 
      }
    };

    if (login) {
      console.log('Admin login found', login);
      verifyTokenn();
    } else {
      setTokenValid(false); 
    }
  }, [login, dispatch]);

  if (!login || tokenValid === false) {
    return <Navigate to='/admin' />;
  }

 
  if (tokenValid === null) {
    return <div>Loading...</div>;
  }

 
  return <Outlet />;
};

export default AdminMiddleware;
