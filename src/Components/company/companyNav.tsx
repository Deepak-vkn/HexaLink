import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutcall } from '../../api/user/post';
import { companyLogout } from '../../Store/companySlice';

interface CompanyNavProps {
  title?: string | null;
}

const CompanyNav: React.FC<CompanyNavProps> = ({ title }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log('logout triggered');
      const result = await logoutcall('company');
      if (result.success) {
        dispatch(companyLogout());
        navigate('/company');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-gray-200 text-gray-300 flex items-center justify-between py-4 px-6 z-20">
      {/* Title */}
      <div>
        <p className="font-sans text-lg font-semibold text-gray-900">{title}</p>
      </div>

      {/* Links */}
      <div className="flex items-center space-x-6">
        <Link
          to="/company/home"
          className="text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
        >
          <span>Dashboard</span>
        </Link>
        <Link
          to="/company/jobs"
          className="text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
        >
          <span>Jobs</span>
        </Link>
        <Link
          to="/company/applications"
          className="text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
        >
          <span>Applications</span>
        </Link>
       
       

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 px-3 py-2 rounded-md"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span>Logout</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CompanyNav;
