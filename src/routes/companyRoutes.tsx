import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CompanyLogin from '../Pages/Company/login';
import CompanyRegister from '../Pages/Company/register';
import CompanyHome from '../Pages/Company/company';
import CompanyLogged from '../middleware/company/companyLogin';
import Companymid from '../middleware/company/companyHome';
import CompanyNav from '../Components/company/companyNav';
import CompanyForgetPassword from '../Pages/Company/forgetPassword';
import CompanyResetPassword from '../Pages/Company/resetPassword';
import CompanyJobs from '../Pages/Company/companyJobs'
import CompanyApplications from '../Pages/Company/companyApplications';
const CompanyRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<CompanyLogged />}>
        <Route path="/" element={<CompanyLogin />} />
        <Route path="/register" element={<CompanyRegister />} />
      </Route>
      <Route element={<Companymid />}>
        <Route path="/home" element={<CompanyHome />} />
      </Route>
      <Route path="/nav" element={<CompanyNav />} />
      <Route path="/forgetpassword" element={<CompanyForgetPassword />} />
      <Route path="/passwordreset" element={<CompanyResetPassword/>} />
      <Route path="/jobs" element={<CompanyJobs />} />
      <Route path="/applications" element={<CompanyApplications/>} />
    </Routes>
  );
};

export default CompanyRoutes;
