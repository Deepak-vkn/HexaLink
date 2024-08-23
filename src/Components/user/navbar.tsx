import React, { useState, useEffect, useRef } from 'react';
import { logoutcall } from '../../api/user/post';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../Store/userSlice';

interface NavbarProps {
  user?: any | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((prevState) => !prevState);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      console.log('Logout triggered');
      const result = await logoutcall('user');
      if (result.success) {
        console.log('Logout successful');
        dispatch(logout());
        navigate('/');
        setIsDropdownOpen(false); 
        setIsMenuOpen(false); 
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-2 text-gray-800 bg-white border rounded-none shadow-md lg:px-8 lg:py-2">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
        >
          Hexa Link
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden mr-4 lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link to="/" className="flex items-center">
                  HOME
                </Link>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link to="/jobs" className="flex items-center">
                  JOBS
                </Link>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link to="/messages" className="flex items-center">
                  MESSAGES
                </Link>
              </li>
              <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                <Link to="/profile" className="flex items-center">
                  PROFILE
                </Link>
              </li>
            </ul>
          </div>
          <div className="relative flex items-center gap-x-1">
            <button
              onClick={toggleDropdown}
              className="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
              type="button"
            >
              <span>{user ? user.name : 'Sample'}</span>
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="z-10 absolute right-0 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button
            className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
            type="button"
            onClick={toggleMenu}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden">
          <ul className="flex flex-col gap-2 mt-2 mb-4">
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <Link to="/" className="flex items-center">
                HOME
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <Link to="/jobs" className="flex items-center">
                JOBS
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <Link to="/messages" className="flex items-center">
                MESSAGES
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
              <Link to="/profile" className="flex items-center">
                PROFILE
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
