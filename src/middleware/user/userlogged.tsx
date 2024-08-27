import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
const UserLogged: React.FC = () => {
    
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    
  
    if (userInfo) {
        return <Navigate to='/home' />
    }
    

    return <Outlet />
}


export default UserLogged