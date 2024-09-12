import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyToken } from '../../api/user/get'; 
import { RootState } from '../../Store/store';
import { logout } from '../../Store/userSlice'; 
import { useDispatch } from 'react-redux';

const UserMiddleware = () => {
  const [tokenValid, setTokenValid] = useState<boolean | null>(null); 
  const login = useSelector((state: RootState) => state.user.login);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const verifyTokenn = async () => {
      try {
        const response = await verifyToken();  
        
        if (response?.token) {  
          console.log('token valdieted ')
          setTokenValid(true);
        } 
      } catch (error) {
        console.error('Token verification failed', error);
        setTokenValid(false);
      }
    };

    if (login) {
      console.log('login found',login)
      verifyTokenn();
    } 
    else {
      setTokenValid(false); 
    }
  }, [login, dispatch]);

  if (!login || tokenValid === false) {
    return <Navigate to='/' />;
  }
  if (tokenValid === null) {
    return <div>Loading...</div>;
  }
  return <Outlet />;
};
export default UserMiddleware;
