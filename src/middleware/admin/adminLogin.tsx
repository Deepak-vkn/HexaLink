import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'

// Rename component to PascalCase

const UserLogged: React.FC = () => {
    
    // Accessing userInfo to check if the user is logged in
    const userInfo = useSelector((state: RootState) => state.admin.adminInfo);
    
    // If userInfo exists, the user is logged in, so redirect to '/home'
    if (userInfo) {
        return <Navigate to='/admin/home' />
    }
    // If not logged in, render the child routes
    return <Outlet />
}


export default UserLogged