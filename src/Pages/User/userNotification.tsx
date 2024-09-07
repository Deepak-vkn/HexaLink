import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { fetchNotification } from '../../api/user/get'; // Adjust the import path as needed

const UserNotification = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNotifications = async () => {
      if (user?._id) {
        try {
          const result = await fetchNotification(user._id);
          if (result.success) {
            setNotifications(result.data || []);
          } else {
            setError(result.message);
          }
        } catch (err) {
          setError('An error occurred while fetching notifications.');
        } finally {
          setLoading(false);
        }
      }
    };
    loadNotifications();
  }, [user]);

  if (loading) {
    return <p>Loading notifications...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-screen-md py-6 px-4 mx-auto bg-white shadow-md rounded-xl">
      {notifications.map((notification, index) => (
        <div key={index} className="mb-4">
          {/* User Info Section */}
          <div className="flex items-center mb-2">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={notification.userId?.image || "https://via.placeholder.com/150"}
              alt="User profile"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-blue-gray-900">
                {notification.userId?.name || 'Unknown User'}
              </h4>
              <p className="text-gray-500 text-sm">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Notification Message */}
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700 mb-2">
            {notification.message}
          </p>
          {/* Redirect Link */}
          {notification.redirectUrl && (
            <a
              href={notification.redirectUrl}
              className="text-blue-500 hover:underline"
            >
              View Details
            </a>
          )}
          <hr className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default UserNotification;
