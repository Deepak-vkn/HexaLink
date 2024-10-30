import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { removeFollower, unfollowRequest } from '../../api/user/post';

interface User {
  id?: {
    _id: string;
    name: string;
    image?: string;
  };
  _id?: string;  
  name?: string;
  image?: string;
  followTime: string;
  status: string;
}

interface UserListModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: User[];
  loggeduser?:boolean;
  onUpdate?: () => void;
}

const UserListModal: React.FC<UserListModalProps> = ({ isOpen, onClose, title, users,loggeduser,onUpdate  }) => {
  const navigate = useNavigate();
  const mainUser = useSelector((state: RootState) => state.user.userInfo);
  const [userList, setUserList] = useState<User[]>(users);

  useEffect(() => {
    // Sync userList with users prop when it changes
    if (users && users.length > 0) {
      setUserList(users);
    }
  }, [users]);

  const handleItemClick = (userId: string) => {
    if (userId === mainUser?._id) return;
    navigate(`/profile/${userId}`, {
      state: { isCurrentUser: false },
    });
  };

  const handleRemoveFollower = async (userId: string) => {
    if (mainUser?._id) {
      const result = await removeFollower(mainUser._id, userId);
      if (result.success) {
        setUserList((prevList) => prevList.filter((user) => (user.id ? user.id._id : user._id) !== userId));
        if (onUpdate) {
          onUpdate();
        }
      }
    }
  };

  const handleUnfollow = async (userId: string) => {
    if (mainUser?._id) {
      const result = await unfollowRequest(mainUser._id, userId);
      if (result.success) {
        setUserList((prevList) => prevList.filter((user) => (user.id ? user.id._id : user._id) !== userId));
        if (onUpdate) {
          onUpdate();
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {title} ({userList.length})
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {userList.length > 0 ? (
            userList.map((user, index) => {
              const userName = user.id ? user.id.name : user.name;
              const userImage = user.id ? user.id.image : user.image;
              const userId = user.id ? user.id._id : user._id;

              const isCurrentUser = userId === mainUser?._id;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 py-3 border-b last:border-b-0 ${
                    isCurrentUser ? 'cursor-default' : 'cursor-pointer'
                  }`}
      
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    {userImage ? (
                      <img src={userImage} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
                        {userName ? userName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold"       onClick={() => handleItemClick(userId || '')}>{isCurrentUser ? 'You' : userName}</p>
                  </div>

                 {/* Only show Remove or Unfollow buttons if the loggeduser is true */}
                 {loggeduser && !isCurrentUser && (
                    <div>
                      {title === 'Followers' && (
                        <button
                          onClick={() => handleRemoveFollower(userId || '')}
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                        >
                          Remove
                        </button>
                      )}
                      {title === 'Following' && (
                        <button
                          onClick={() => handleUnfollow(userId || '')}
                          className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                        >
                          Unfollow
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-center py-4">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
