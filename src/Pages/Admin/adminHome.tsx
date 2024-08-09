import React from 'react'
import CompanyNav from '../../Components/admin/adminNav'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
const adminHome = () => {
    const user = useSelector((state: RootState) => state.admin.adminInfo);
  return (
    <div>
        <CompanyNav user={user}/>
      
    </div>
  )
}

export default adminHome
