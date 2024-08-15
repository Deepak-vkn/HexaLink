import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLogin from '../Pages/Admin/login';
import AdminHome from '../Pages/Admin/adminHome';
import AdminLogged from '../middleware/admin/adminLogin';
import Adminmid from '../middleware/admin/adminHome';
import AdminUsers from '../Pages/Admin/adminUsers';
import AdminCompany from '../Pages/Admin/adminCompany';
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AdminLogged />}>
        <Route path="/" element={<AdminLogin />} />
      </Route>

      <Route element={<Adminmid />}>
        <Route path="/home" element={<AdminHome />} />
      </Route>

      <Route path="/users" element={<AdminUsers />} />
      <Route path="/company" element={<AdminCompany />} />
    </Routes>
  );
};

export default AdminRoutes;
