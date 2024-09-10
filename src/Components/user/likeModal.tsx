import React from 'react';

interface User {
  id: {
    _id: string;
    name: string;
    image?: string;
  };
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
  if (!isOpen) return null;
  console.log('users:', users);

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
            users.map((user, index) => (
              <div key={index} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  {user.id.image ? (
                    <img src={user.id.image} alt={user.id.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
                      {user.id.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{user.id.name}</p>

                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
