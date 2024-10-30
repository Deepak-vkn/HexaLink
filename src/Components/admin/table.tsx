import React from 'react';

interface TableProps {
  data: any[]; // Adjust the type as needed
  headings: string[];
  onBlockUser: (userId: string) => void;
}

const Table: React.FC<TableProps> = ({ data, headings, onBlockUser }) => {
  return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              {headings.map((heading, index) => (
                <th key={index} className="py-3 px-6 text-left">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-gray-100">
                {/* Profile Picture */}
                <td className="py-3 px-6 text-left">
                  <img
                    src={user.profilePic || '/path/to/default/image.jpg'} // Adjust path to default image
                    alt="Profile"
                    className="w-12 h-12 rounded-full"
                  />
                </td>
                {/* Name */}
                <td className="py-3 px-6 text-left">{user.name}</td>
                {/* Email */}
                <td className="py-3 px-6 text-left">{user.email}</td>
                {/* Join Date */}
                <td className="py-3 px-6 text-left">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
                {/* Status */}
                <td className={`py-3 px-6 text-left ${user.is_block ? 'text-red-500' : 'text-green-500'}`}>
                  {user.is_block ? 'Blocked' : 'Active'}
                </td>
                {/* Actions */}
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-start">
                    {user.is_block ? (
                      <button
                        className="bg-green-500 text-white px-4 py-2 w-24 rounded hover:bg-green-600"
                        onClick={() => onBlockUser(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-4 py-2 w-24 rounded hover:bg-red-600"
                        onClick={() => onBlockUser(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
};

export default Table;
