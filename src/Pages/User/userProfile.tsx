import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import UserProfile from '../../Components/profile';

import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { getUser } from '../../api/user/get'; 
import Loading from '../../Components/Loading';
const UserProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  console.log('user id is ',userId) 
  const location = useLocation();
  const [profileUser, setProfileUser] = useState<any>(null); 
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [isLoading, setIsLoading] = useState(false); 
  const state = location.state as { isCurrentUser?: boolean } | null;
  const isCurrentUser = state?.isCurrentUser !== undefined ? state.isCurrentUser : !userId;

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          // Fetch the user data from the backend using the userId from the URL
          const data = await getUser(userId);
          setProfileUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error, e.g., set a fallback or error state
        }
        finally {
          setIsLoading(false); // Set loading to false after fetching
        }
      }
       else {
        setProfileUser(user);
      }
    };

    fetchProfileUser();
  }, [userId, user]);

  if (!profileUser) {
   
    return <Loading/>;
  }
  console.log('profiler is ',profileUser)

  return (
    <div>
      {isLoading ? (
        <Loading /> 
      ) : (
        <UserProfile user={profileUser} isCurrentUser={isCurrentUser} />
      )}
      
    </div>
  );
};

export default UserProfilePage;
