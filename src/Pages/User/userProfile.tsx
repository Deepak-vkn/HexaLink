
import UserProfile from '../../Components/profile'
import Navbar from '../../Components/user/navbar'
import { useSelector } from 'react-redux'
import { RootState } from '../../Store/store'
const userProfile = () => {
    const user = useSelector((state: RootState) => state.user.userInfo);
  return (
    <div>
       <Navbar  user={user}/>
      <UserProfile user={user}/>
    </div>
  )
}

export default userProfile
