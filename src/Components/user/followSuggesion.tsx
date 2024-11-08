import React, { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { followSuggestion } from '../../api/user/get'; 
import { followRequest } from '../../api/user/post'; 
import Loading from '../Loading';
interface SuggestedUser {
  _id: string; 
  name: string;
  title: string;
  image?: string;
}

const FollowSuggestion: React.FC = () => {
  const [suggestedUsers, setSuggestedUsers] = useState<SuggestedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonStates, setButtonStates] = useState<{ [key: string]: string }>({}); 

  const user = useSelector((state: RootState) => state.user.userInfo); 

  const dummyUsers: SuggestedUser[] = [
    { _id: '1', name: 'John Doe', title: 'Software Engineer' },
    { _id: '2', name: 'Jane Smith', title: 'Product Manager' },
    { _id: '3', name: 'Alex Johnson', title: 'UI/UX Designer' },
  ];

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setLoading(true);
        setError(null);

        if (user?._id) {
          const response = await followSuggestion(user._id); 

          if (response.length === 0) {
            setSuggestedUsers(dummyUsers);
          } else {
       
            const limitedSuggestions = response.slice(0, 5);
            setSuggestedUsers(limitedSuggestions);

            const initialButtonStates = limitedSuggestions.reduce((acc: any, curr: SuggestedUser) => {
              acc[curr._id] = 'Follow';
              return acc;
            }, {});
            setButtonStates(initialButtonStates);
          }
        }
      } catch (err) {
        setError('Failed to load suggestions');
        console.error(err);
        setSuggestedUsers(dummyUsers); 
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [user?._id]); 

  const handleFollowClick = async (suggestedUserId: string) => {
    try {
      if (!user?._id || !suggestedUserId) {
        console.error('Invalid user IDs for follow action');
        return;
      }

      const result = await followRequest(user._id, suggestedUserId);

      if (result && result.success) {
       
        setButtonStates((prevStates) => ({
          ...prevStates,
          [suggestedUserId]: 'Requested',
        }));
      } else {
        console.error('Follow action failed');
      }
    } catch (error) {
      console.error('Error handling follow click:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h3 className="text-md font-semibold text-gray-800 mb-3">Suggested Connections</h3>
      {loading &&<Loading/>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-3">
          {suggestedUsers.map((suggestedUser) => (
            <li key={suggestedUser._id} className="flex items-center">
              <FaUserCircle className="w-8 h-8 text-gray-400 mr-2" />
              <div>
                <p className="font-medium text-sm text-gray-800">{suggestedUser.name}</p>
                <p className="text-xs text-gray-600">{suggestedUser.title}</p>
              </div>
              <button
                className={`ml-auto ${
                  buttonStates[suggestedUser._id] === 'Requested'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                } px-2 py-1 rounded-full text-xs transition duration-300`}
                onClick={() => handleFollowClick(suggestedUser._id)}
                disabled={buttonStates[suggestedUser._id] === 'Requested'}
              >
                {buttonStates[suggestedUser._id]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowSuggestion;
