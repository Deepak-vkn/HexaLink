import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { logoutcall, sendToBackend } from '../../api/user/post';
import { useDispatch } from 'react-redux';
import { useNavigate, Link,useLocation  } from 'react-router-dom';
import { logout } from '../../Store/userSlice';
import { IoPerson, IoNotifications, IoHome, IoBriefcase, IoChatbubbles } from "react-icons/io5";
import { IoIosSearch, IoMdMenu, IoMdClose } from "react-icons/io";
import { initializeSocket } from '../../Socket/socket';
import { socket } from '../../Socket/socket';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
import { fetchNotification } from '../../api/user/get';
interface User {
  id: string;
  name: string;
  email: string;
}

interface NavbarProps {
  user?: any | null;
}

const Navbar: React.FC<NavbarProps> = () => {
  initializeSocket()
 
    const user = useSelector((state:any) => state.user.userInfo);
    if (user?._id) {
      socket.emit('addUser', user._id);
    }
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0); 
  const location = useLocation(); // To monitor the current route

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
  // Reset notification count when navigating to the notification page
  useEffect(() => {
    if (location.pathname === '/notification') {
      setNotificationCount(0); // Reset notification count
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchData = async () => {
      initializeSocket();
      if (user?._id) {
        socket.emit('addUser', user._id);
        try {
          const result = await fetchNotification(user._id); 
          if (result.success) {
            // Count unread notifications
            const unreadNotifications = result.data.filter(notification => !notification.isRead);
            setNotificationCount(unreadNotifications.length); 
          }
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      }
    };
  
    fetchData();
  
  }, [user?._id]);
  
   useEffect(() => {
    const handleNotificationUpdate = (notification: any) => {
      console.log('Notification received:', notification);
      setNotificationCount((prevCount) => prevCount + 1);
    };

    socket.on('notificationUpdate', handleNotificationUpdate);

    return () => {
      socket.off('notificationUpdate', handleNotificationUpdate);
    };
  }, []); // Only run on mount and unmount


  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (value) {
      const results = await sendToBackend(value); 
      setSearchResults(results);
      setIsModalOpen(true); 
    } else {
      setSearchResults([]);
      setIsModalOpen(false);
    }
  };

  const handleItemClick = (result:any) => {
    console.log('Clicked profile navigate');
    const userId = result._id; 
    navigate(`/profile/${userId}`, {
      state: { isCurrentUser: false }
    });

  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between h-14">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-lg font-bold text-blue-500">Hexa Link</span>
            </Link>
          </div>

          <div className="hidden sm:ml-4 sm:flex sm:items-center">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search users..."
                className="w-56 px-3 py-1.5 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <IoIosSearch className="absolute right-3 top-1.5 text-gray-400 text-lg" />
              
              {isModalOpen && searchResults?.length > 0 && (
                <div
                  ref={modalRef}
                  className="absolute top-12 w-full bg-white border border-gray-300 rounded-md shadow-lg z-20"
                >
                  <ul>
                    {searchResults.map((result: any) => (
                      <li
                        key={result.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer flex items-center text-sm"
                        onClick={() => handleItemClick(result)}
                      >
                      {result.image ? (
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                    ) : (
                      <div
                        className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-2 text-white text-xs"
                      >
                        {result.name.charAt(0).toUpperCase()}
                      </div>
                       )}
                        <span>{result.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="hidden sm:ml-4 sm:flex sm:items-center space-x-3">
              <Link to="/" className="text-sm text-gray-600 hover:text-gray-400">Home</Link>
              <Link to="/jobs" className="text-sm text-gray-600 hover:text-gray-400">Jobs</Link>
              <Link to="/message" className="text-sm text-gray-600 hover:text-gray-400">Messages</Link>
              <Link to="/profile" className="text-gray-600 hover:text-gray-400"><IoPerson size={16} /></Link>
              <Link to="/notification" className="text-gray-600 hover:text-gray-400 relative">
              <IoNotifications size={16} />
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>
            </div>
            <div className="ml-4 relative">
              <button
                onClick={toggleDropdown}
                className="bg-blue-500 text-white rounded-full px-3 py-1.5 text-xs font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
              >
                {user ? user.name : 'Sample'}
              </button>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="origin-top-right absolute right-0 mt-1 w-40 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-1.5 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {isMenuOpen ? <IoMdClose size={20} /> : <IoMdMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50">Home</Link>
            <Link to="/jobs" className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50">Jobs</Link>
            <Link to="/message" className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50">Messages</Link>
            <Link to="/profile" className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50">Profile</Link>
            <Link to="/notification" className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50">Notifications</Link>
          </div>
          <div className="pt-3 pb-2 border-t border-gray-200">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <img className="h-8 w-8 rounded-full" src={user?.image || 'https://via.placeholder.com/32'} alt="" />
              </div>
              <div className="ml-2">
                <div className="text-sm font-medium text-gray-800">{user ? user.name : 'Sample User'}</div>
                <div className="text-xs font-medium text-gray-500">{user ? user.email : 'sample@example.com'}</div>
              </div>
            </div>
            <div className="mt-2 space-y-1">
              <button
                onClick={handleLogout}
                className="block px-3 py-1.5 rounded-md text-sm font-medium text-gray-700 hover:text-gray-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
