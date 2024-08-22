
import { Navigate, Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store';

const UserMiddleware = () => {


  const login = useSelector((state: RootState) => state.company.login);
  if (!login ) {

    return <Navigate to='/company' />;
  
  }
  return <Outlet />;
};

export default UserMiddleware;
