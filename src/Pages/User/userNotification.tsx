import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { fetchNotification, resetNotificationCount, removeAllNotifications } from '../../api/user/get'; 
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaUserPlus, FaUserCheck, FaCommentDots, FaEllipsisV } from 'react-icons/fa';
import NoContent  from '../../Components/user/Noposts';
import Loading from '../../Components/loading';
// import LeftBanner from '../../Components/user/leftBanner';
// import RightBanner from '../../Components/user/rightBanner';

import FollowSuggesion from '../../Components/user/followSuggesion';
// import LeftActivityBar from '../../Components/user/leftBottom';
import LeftTopBox from '../../Components/user/leftTopBox';

const UserNotification = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [expandedType, setExpandedType] = useState<string | null>(null);
  const [showClearDropdown, setShowClearDropdown] = useState<string | null>(null); // Change to track the type
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadNotifications = async () => {
      if (user?._id) {
        try {
          setLoading(true);
          resetNotificationCount(user._id);
          const result = await fetchNotification(user._id);
          if (result.success) {
      
            setNotifications(result.data || []);
            if (result.data.length > 0) {
              const firstType = result.data[0].type;
              setExpandedType(firstType);
            }
          } else {
            setError(result.message);
          }
        } catch (err) {
          setError('An error occurred while fetching notifications.');
        }
        finally {
          setLoading(false); 
        }
      } else {
        setError('User ID not available.');
      }
    };
    loadNotifications();
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  const handleClearNotifications = async () => {
    try {
      if(user){
        const result = await removeAllNotifications(user._id, selectedType);
        if (result.success) {
          setNotifications((prev) => prev.filter((notification) => notification.type !== selectedType)); 
          setShowClearDropdown(null);
          setSelectedType(null); 
        } else {
          setError(result.message);
        }
      }
     
    } catch (err) {
      setError('An error occurred while clearing notifications.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (notifications.length === 0) {
    return <NoContent title="No notifications yet!" />;
  }


  const groupedNotifications = notifications.reduce((acc: any, notification) => {
    const { type } = notification;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(notification);
    return acc;
  }, {});

  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="max-w-7xl mx-auto px-8 py-8 sm:px-12 lg:px-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {/* Left Sidebar with Banner Image */}
        <div className='h-50'>
        <LeftTopBox user={user}/>
        </div>

        {/* Middle - Notifications Feed */}
        <div className="md:col-span-2 space-y-4">
          {Object.keys(groupedNotifications).map((type) => {
            const notificationsOfType = groupedNotifications[type];
            let displayText = '';
            let IconComponent;

            if (type === 'like') {
              const firstUser = notificationsOfType[0]?.sourceId?.name || 'Unknown User';
              const othersCount = notificationsOfType.length > 1 ? notificationsOfType.length - 1 : 0;
              displayText = `${firstUser} ${othersCount > 0 ? `and ${othersCount} others` : ''} liked your post.`;
              IconComponent = FaHeart;
            } else if (type === 'follow accept') {
              const firstUser = notificationsOfType[0]?.sourceId?.name || 'Unknown User';
              displayText = `${firstUser} accepted your follow request.`;
              IconComponent = FaUserCheck;
            } else if (type === 'follow request') {
              const firstUser = notificationsOfType[0]?.sourceId?.name || 'Unknown User';
              displayText = `${firstUser} sent you a follow request.`;
              IconComponent = FaUserPlus;
            } else if (type === 'comment') {
              displayText = `${notificationsOfType.length} new comments on your post.`;
              IconComponent = FaCommentDots;
            }

            return (
              <div key={type} className="bg-white shadow rounded-lg p-4">
                <div 
                  className="flex items-center justify-between font-semibold text-blue-gray-900 cursor-pointer" 
                  onClick={() => setExpandedType(expandedType === type ? null : type)}
                >
                  <div className="flex items-center">
                    {IconComponent && <IconComponent className="mr-2" />}
                    {displayText}
                  </div>
                  <div className="relative">
                    <FaEllipsisV 
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowClearDropdown(showClearDropdown === type ? null : type);
                        setSelectedType(type);
                      }}
                    />
                    {showClearDropdown === type && (
                      <div className="absolute right-0 bg-white shadow-md rounded mt-2 z-10">
                        <button 
                          className="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 w-40 text-left rounded-md shadow-sm"
                          onClick={handleClearNotifications}
                        >
                          Clear All
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {expandedType === type && (
                    <motion.div
                      className="ml-4 mt-2"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {notificationsOfType.map((notification:any, index:number) => (
                        <div key={index} className="flex items-center mb-2">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={notification.sourceId?.image || "https://via.placeholder.com/150"}
                            alt="User profile"
                          />
                          <div className="ml-3">
                            <h4 className="font-semibold text-blue-gray-900">
                              {notification.sourceId?.name || 'Unknown User'}
                            </h4>
                            <p className="text-gray-500 text-sm">
                              {new Date(notification.createdAt).toLocaleString()}
                            </p>
                            <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700 mb-2">
                              {notification.message}
                            </p>
                            {notification.redirectUrl && (
                              <a
                                href={notification.redirectUrl}
                                className="text-blue-500 hover:underline"
                              >
                                View Details
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Sidebar with Banner Image */}
     <div> <FollowSuggesion/></div>
      </div>
    </div>
  </div>
  );
};

export default UserNotification;
