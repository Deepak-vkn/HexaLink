import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { logoutcall, sendToBackend } from '../../api/user/post';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../Store/userSlice';
import { IoIosSearch } from "react-icons/io";

interface User {
  id: string;
  name: string;
  email: string;
}

interface NavbarProps {
  user?: any | null;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value) {
      const results = await sendToBackend(value); // Adjust this to match your actual API response structure
      setSearchResults(results);
      setIsModalOpen(true); // Show the modal with search results
    } else {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  };

  const handleItemClick = (result:any) => {
    console.log('clcied profile navigate')
    navigate(`/profile`, {
      state: { user: result, isCurrentUser: false }
    });
  };


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

          {/* Search bar */}
          <div className="hidden lg:flex items-center relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search users..."
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <button
              id="search-button"
              type="button"
              className="btn btn-primary ml-2 py-2 px-4"
            >
              <IoIosSearch />
            </button>

            {/* Modal displaying search results */}
            {isModalOpen && searchResults?.length > 0 && (
              <div ref={modalRef} className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20">
                <ul>
                {searchResults.map((result: any) => (
        <li key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer flex items-center">
          <img 
            src={result.image} 
            alt={result.name} 
            className="w-8 h-8 rounded-full mr-3"
            onClick={() => handleItemClick(result)} 
          />
          {result.name}
        </li>
      ))}
              </ul>
              </div>
            )}
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
