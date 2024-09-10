import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'

interface User {
  id?: {
    _id: string;
    name: string;
    image?: string;
  };
  _id?: string;  // Added to handle users without an `id` field
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
}

const UserListModal: React.FC<UserListModalProps> = ({ isOpen, onClose, title, users }) => {
  const navigate = useNavigate();
  const mainUser = useSelector((state: RootState) => state.user.userInfo);

  const handleItemClick = (userId: string) => {
    if (userId === mainUser?._id) return; // Disable click if it's the current user
    console.log('Clicked profile navigate with user ID:', userId);
    navigate(`/profile/${userId}`, {
      state: { isCurrentUser: false }
    });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {title} ({users.length})
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
          {users.length > 0 ? (
            users.map((user, index) => {
              const userName = user.id ? user.id.name : user.name;
              const userImage = user.id ? user.id.image : user.image;
              const userId = user.id ? user.id._id : user._id;

              // Check if the current user matches the user in the list
              const isCurrentUser = userId === mainUser?._id;

              return (
                <div
                  key={index}
                  className={`flex items-center space-x-4 py-3 border-b last:border-b-0 ${
                    isCurrentUser ? 'cursor-default' : 'cursor-pointer'
                  }`}
                  onClick={() => handleItemClick(userId || '')} // Disable link for the current user
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
                    <p className="font-semibold">{isCurrentUser ? 'You' : userName}</p>
                  </div>
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
