import React from 'react'
import CompanyNav from '../../Components/company/companyNav'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
const company = () => {
    const user = useSelector((state: RootState) => state.company.companyInfo);
  return (
    <div>
    <CompanyNav user={user}/>  
    company home page
    </div>
  )
}

export default company
