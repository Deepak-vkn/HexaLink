import { useLocation } from 'react-router-dom';
import UserProfile from '../../Components/profile';
import Navbar from '../../Components/user/navbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

const UserProfilePage = () => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.userInfo);

  // Safely access state and provide fallback values
  const state = location.state as { user?: any; isCurrentUser?: boolean } | null;
  const displayUser = state?.user || user;
  const isCurrentUser = state?.isCurrentUser !== undefined ? state.isCurrentUser : true;

  console.log('displayUser:', displayUser);

  return (
    <div>
      <Navbar user={displayUser} />
      <UserProfile user={displayUser} isCurrentUser={isCurrentUser} />
    </div>
  );
};

export default UserProfilePage;
