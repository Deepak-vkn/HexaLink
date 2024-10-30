
import { FaUserCircle } from 'react-icons/fa'; // Ensure this import is added
import { Link } from 'react-router-dom'; // Import Link if you're using react-router




interface LeftTopBoxProps {
  user: any;
}

const LeftTopBox: React.FC<LeftTopBoxProps> = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex flex-col items-center">
        {user?.image ? (
          <img
            className="w-24 h-24 rounded-full object-cover mb-3"
            src={user.image}
            alt={`${user?.name}'s profile`}
          />
        ) : (
          <FaUserCircle className="w-24 h-24 text-gray-400 mb-3" />
        )}
        <h2 className="text-lg font-semibold text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{user?.role || 'No role available'}</p>
        {user?.skill && user.skill.length > 0 ? (
          <p className="text-xs text-gray-600 mt-1">
            {user.skill.slice(0, 3).join(' || ')}
            {user.skill.length > 3 ? ' || ...' : ''}
          </p>
        ) : (
          <p className="text-xs text-gray-600 mt-1">No skills available</p>
        )}
        <Link
          to="/profile"
          className="mt-3 w-full bg-blue-600 text-white py-1.5 px-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out text-center text-sm"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default LeftTopBox;