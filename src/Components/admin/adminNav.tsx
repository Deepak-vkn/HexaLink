import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutcall } from '../../api/user/post';
import { adminLogout } from '../../Store/adminSlice';

interface AdminNavProps {
  title?: string | null;
}

const AdminNav: React.FC<AdminNavProps> = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logoutcall('admin');
      if (result.success) {
        dispatch(adminLogout());
        navigate('/admin');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between ">
          <div className="flex items-center">
            <Link to="/admin/home" className="text-lg font-semibold text-gray-900">
              {title || 'Admin Dashboard'}
            </Link>
            <div className="hidden sm:ml-6 sm:flex space-x-8 ml-8">
              <Link
                to="/admin/home"
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/company"
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium"
              >
                Company
              </Link>
              {/* <Link
                to="/admin/job"
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium"
              >
                Jobs
              </Link> */}
              <Link
                to="/admin/users"
                className="text-gray-900 hover:text-blue-500 px-3 py-2 text-sm font-medium"
              >
                Users
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNav;
