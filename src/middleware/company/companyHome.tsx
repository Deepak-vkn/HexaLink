import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { verifyToken } from '../../api/company/get';
import { RootState } from '../../Store/store';

const CompanyMiddleware = () => {
  const [tokenValid, setTokenValid] = useState<boolean | null>(null); 
  const login = useSelector((state: RootState) => state.company.login); 
  const dispatch = useDispatch();

  useEffect(() => {
   
    const verifyTokenn = async () => {
      try {
        const response = await verifyToken();  
        
        if (response?.token) {  
          console.log('Company token validated');
          setTokenValid(true); 
        } else {
          console.log('Company token invalid');
          setTokenValid(false); 
    
        }
      } catch (error) {
        console.error('Token verification failed', error);
        setTokenValid(false);
        
      }
    };
    if (login) {
      console.log('Company login found', login);
      verifyTokenn();
    } else {
      setTokenValid(false);
    }
  }, [login, dispatch]);

  if (!login || tokenValid === false) {
    return <Navigate to='/company' />;
  }

  if (tokenValid === null) {
    return <div>Loading...</div>;
  }

 
  return <Outlet />;
};

export default CompanyMiddleware;
