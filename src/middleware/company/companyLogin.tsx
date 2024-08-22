import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'

// Rename component to PascalCase

const UserLogged: React.FC = () => {
    
    // Accessing userInfo to check if the user is logged in
    const userInfo = useSelector((state: RootState) => state.company.companyInfo);
   
    // If userInfo exists, the user is logged in, so redirect to '/home'
    if (userInfo) {
        console.log(userInfo)
        return <Navigate to='/company/home' />
    }
    return <Outlet />
}


export default UserLogged