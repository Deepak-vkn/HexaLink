import React, { useState,useEffect } from 'react';
import Modal from './modal';
import { updateUser,updateEducation,followRequest,unfollowRequest } from '../api/user/post';
import { getUserPosts ,fetchFollowDocument} from '../api/user/get'
import { useSelector } from 'react-redux';
import { RootState } from '../Store/store'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

import UserListModal from './user/likeModal'
interface UserProfileProps {
  user?: any;
  isCurrentUser:boolean;
}
interface Post {
  _id:string;
  images: string[];
  caption: string;
  postAt: string; 
}

const Profile: React.FC<UserProfileProps> = ({ user ,isCurrentUser}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldsToShow, setFieldsToShow] = useState<string[]>([]);
  const [userData, setUserData] = useState<any | null>(user);
  const [posts, setPosts] = useState<Post[]>([]);
  const [followData, setFollowData] = useState(null);
  const [isFollowed, setIsFollowed] = useState<boolean>(false); 
  const [followButtonText, setFollowButtonText] = useState<string>('Follow');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); 
  const mainUser = useSelector((state: RootState) => state.user.userInfo);
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false);
const [modalUsers, setModalUsers] = useState([]);
const [modalTitle, setModalTitle] = useState('');

  const handleShowFollowers = () => {
   
    const approvedFollowers = (followData as any)?.followers?.filter((follow: any) => follow.status === 'approved');
    setModalUsers(approvedFollowers);
    console.log(approvedFollowers)
    setModalTitle('Followers');
    setIsUserListModalOpen(true);
  };
  
  const handleShowFollowing = () => {
    const approvedFollowing = (followData as any)?.following?.filter((follow: any) => follow.status === 'approved');
    setModalUsers(approvedFollowing);
    setModalTitle('Following');
    setIsUserListModalOpen(true);
  };
  const handleOpenModal = (fields: string[]) => {
      setFieldsToShow(fields);
      setIsModalOpen(true);
  };

  const handleCloseModal = () => {
      setIsModalOpen(false);
  };

  const handleSaveChanges = async (updatedUser: any) => {
      try {
       
          const getChangedFields = (originalUser: any, updatedUser: any) => {
              if (!originalUser) return updatedUser;

              const changedFields: any = {};
              for (const key in updatedUser) {
                  if (originalUser[key] !== updatedUser[key]) {
                      changedFields[key] = updatedUser[key];
                  }
              }
              return changedFields;
          };

          const changedFields = getChangedFields(userData, updatedUser);

     
          if (Object.keys(changedFields).length === 0) {
              console.log('No changes detected.');
              handleCloseModal();
              return;
          }


          const response = await updateUser(userData?._id, changedFields);
          console.log('User updated successfully:', response);
          if (response && response.success) {
 
              setUserData((prevUserData:any) => {
                console.log('Previous user data:', prevUserData);
               
                return {
                    ...prevUserData,
                    ...response.user,
                };
            });
            toastr.success(response.message);
          } else {
            toastr.error(response.message);
              console.error('Error updating user:', response?.message);
          }
      } catch (error) {
        toastr.error('Error updating user');
          console.error('Error updating user:', error);
      }

      handleCloseModal();
  };

  const handleDelete = async (index: number,field:any) => {
    try {
      const response = await updateEducation(user._id, index,field);
    
      if (response.success) {
        toastr.success(response.message);
     
      } else {
        toastr.error(response.message);
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toastr.error('Error deleting education');
    }
  };

  const fetchData = async () => {
    if (user && user._id) {
      try {
        const postsData = await getUserPosts(user._id);
        if (postsData.success) {
          setPosts(postsData.posts || []);
        } else {
          toastr.error(postsData.message);
        }
  
        const followResponse = await fetchFollowDocument(user._id);
        if (followResponse.success) {
          setFollowData(followResponse.follow || null);
         
          if (!isCurrentUser && mainUser?._id) {
            const currentUserId = mainUser._id;
  
            const isRequestSentByUser = followResponse.follow.following.some(
              (follow: any) =>
                follow.id._id === currentUserId && follow.status === 'requested'
            );
  
            if (isRequestSentByUser) {
              setFollowButtonText('Accept');
              setIsButtonDisabled(false);
            } else {
   
              const isFollowing = followResponse.follow.followers.some(
                (follower: any) =>
                  follower.id._id === currentUserId && follower.status === 'approved'
              );
             
              const isRequested = followResponse.follow.followers.some(
                (follower: any) =>
                  follower.id._id === currentUserId && follower.status === 'requested'
              );
  
              if (isFollowing) {
                setFollowButtonText('Unfollow');
                setIsFollowed(true)
                // setIsButtonDisabled(true);
              } else if (isRequested) {
                setFollowButtonText('Requested');
                setIsButtonDisabled(true);
              } else {
                setFollowButtonText('Follow');
                setIsButtonDisabled(false);
              }
            }
          }
        } else {
          toastr.error(followResponse.message);
        }
      } catch (error) {
        toastr.error('Error fetching data');
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    setUserData(user);
  }, [user]);

  const handleFollowClick = async () => {
    try {
      if (!mainUser?._id || !user._id) {
        console.error('Invalid user IDs for follow action');
        return;
      }
  
      let result;
      if (followButtonText === 'Follow') {

        result = await followRequest(mainUser._id, user._id);
      } else if (followButtonText === 'Accept') {
        result = await followRequest(user._id, mainUser._id);
      }
      else if (followButtonText === 'Unfollow') {
        await handleUnfollowClick(); 
        return; 
      }
  
      if (result && result.success) {
     
        await fetchData();
  
      } else {
        toastr.error('Follow action failed');
      }
    } catch (error) {
      console.error('Error handling follow click:', error);
    }
  };
  const handleUnfollowClick = async () => {
    try {
      if (!mainUser?._id || !user._id) {
        console.error('Invalid user IDs for unfollow action');
        return;
      }
  
      const result = await unfollowRequest(mainUser._id, user._id); 
      if (result && result.success) {
        await fetchData(); 
      } else {
        toastr.error('Unfollow action failed');
      }
    } catch (error) {
      console.error('Error handling unfollow click:', error);
    }
  };

  return (
    <div>
     <Modal isOpen={isModalOpen}
      onClose={handleCloseModal} 
       user={user}     fields={fieldsToShow}
        onSaveChanges={handleSaveChanges}/>
      {/* COVER IMAGE SATRT */}
      <div className="relative h-screen w-full">
        <img
          src="\src\Public\bg.jpg"
          alt="Background"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
          <h5 className="text-xl mb-2">Hello, I'm</h5>
          <h2 className="text-5xl font-bold mb-4">Jimmy Anderson</h2>
          <p className="text-center mb-6 max-w-lg">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.
          </p>
          <a
            href=""
            className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          >
            Download CV
          </a>
        </div> */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4">
        <h5 className="text-xl mb-2">Hello, I'm</h5>
        <h2 className="text-5xl font-bold mb-4">{user.name}</h2>
        <p className="text-center mb-6 max-w-lg">
          {user.role?user.role:'Add Your Role'}
        </p>
        <div className="flex space-x-6">
  <div className="flex flex-col items-center">
    {!isCurrentUser &&(<button className="w-32 text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">
      Message
    </button>)}
    
    <span className="text-2xl font-semibold mt-2" >
  {/* {followData?.following.filter(follow => follow.status === 'approved').length} */}
  {(followData as any)?.following?.filter((follow: any) => follow.status === 'approved').length}

</span>

    <span className="text-sm text-white cursor-pointer hover:underline hover:text-blue-400" onClick={handleShowFollowing}>Following</span>
  </div> 
  <div className="flex flex-col items-center">
  {!isCurrentUser && (
                <button
                  className="w-32 text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
                  onClick={handleFollowClick}
                  disabled={isButtonDisabled} 
                >
                  {followButtonText} 
                </button>
              )}

<span className="text-2xl font-semibold mt-2" >
  {/* {followData?.followers.filter(follow => follow.status === 'approved').length} */}
  {(followData as any)?.followers?.filter((follow: any) => follow.status === 'approved').length}

</span>
<span 
  className="text-sm text-white cursor-pointer hover:underline hover:text-blue-400" 
  onClick={handleShowFollowers}
>
  Followers
</span>

  </div>
</div>
      </div>
      {isCurrentUser && (
        <div className="absolute bottom-4 right-4">
          <button
            className="text-white p-2 rounded-full shadow"
            onClick={() => handleOpenModal(['name', 'role'])}
          >
            <img
              src="/src/Public/edit-editor-pen-pencil-write-icon--4.png"
              alt="Edit"
              className="w-6 h-6"
            />
          </button>
        </div>
      )}

      </div>
      {/* COBER IMAGE END */}

      {/* ABOUT START */}

      <div id="about_us" className="relative min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 relative">
      <div className="text-center mb-8">
      <h2 className="text-3xl font-bold">About Me</h2>
      <p className="text-gray-600 mt-2">Simplifying Language for Global Understanding.</p>
     </div>
      <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-3/12 w-full mb-6 md:mb-0">
      <img
            src={user.image ? user.image : '/src/Public/about.jpg'}
            alt="User Profile"
            className="rounded-lg shadow-xl"
        />
      </div>
      <div className="md:w-7/12 w-full md:pl-8">
        <p className="text-gray-700 mb-4 leading-relaxed">
          {user.about?user.about:"Drop something about youu"}
        </p>
        {/* <div className="flex justify-center mt-6">
          <button className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow hover:bg-gray-600">
            Edit Profile
          </button>
        </div> */}
      </div>
    </div>
    {isCurrentUser && (
  <div className="absolute bottom-4 right-4">
    <button
      className="p-2 rounded-full shadow hover:cursor-pointer"
      onClick={() => handleOpenModal(['about', 'image'])}
    >
      <img
        src="/src/Public/edit-editor-pen-pencil-write-icon--4.png"
        alt="Edit"
        className="w-6 h-6"
      />
    </button>
  </div>
)}

  </div>
</div>

     {/* ABOUT END */}

     {/* <!--*************** My Services Starts Here ***************--> */}

     <section id="services" className="features container-fluid bg-white py-12">
      <div className="container mx-auto">
        <div className="relative row session-title text-center mb-8">
          <h2 className="text-3xl font-bold">My Education</h2>
          <p className="text-gray-600 mt-2">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
          </p>
          {isCurrentUser && (
  <div className="absolute top-0 right-0 mt-4 mr-4">
    <button
      className="p-2 rounded-full shadow hover:cursor-pointer"
      onClick={() => handleOpenModal(['education'])}
    >
      <img
        src="/src/Public/add.png"
        alt="Add"
        className="w-6 h-6"
      />
    </button>
  </div>
)}
        </div>

        <div className="row feature-row grid grid-cols-1 md:grid-cols-3 gap-6">
          {user.education.length > 0 ? (
            user.education.map((edu:any, index:number) => (
              <div key={index} className="relative col-md-4">
                <div className="feature-col bg-white p-8 text-center rounded-lg shadow-2xl transition duration-300 hover:shadow-lg">
                  <i className="far fa-newspaper text-4xl text-blue-500 mb-4"></i>
                  <h4 className="text-xl font-semibold mb-2">Program : {edu.degree || 'Degree'}</h4>
                  <p className="text-gray-600">Institution : {edu.institution || 'Institution'}</p>
                  <p className="text-gray-600">Year of Completion {edu.year || 'Year'}</p>
                  {isCurrentUser && (
  <div className="absolute bottom-4 right-4 flex space-x-2">
    <button
      className="p-2 rounded-full shadow hover:bg-gray-100"
      onClick={() => handleDelete(index, 'education')}
    >
      <img
        src="/src/Public/delete.png"
        alt="Delete"
        className="w-4 h-4"
      />
    </button>
  </div>
)}

                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">No education entries available</div>
          )}
        </div>
      </div>
    </section>

        {/* <!--*************** My Services end Here ***************--> */}

        {/* <!--*************** My SKills start Here ***************--> */}
<section id="skills" className="skills container-fluid py-12">
  <div className="container mx-auto">
    <div className=" relative row session-title text-center mb-8">
      <h2 className="text-2xl font-bold">My Skills</h2>
      <p className="text-gray-600 mt-2 text-sm">
        A showcase of the technologies I work with and my proficiency in them.
      </p>
      {isCurrentUser && (
  <div className="absolute bottom-3 right-4">
    <button
      className="p-2 rounded-full shadow hover:cursor-pointer"
      onClick={() => handleOpenModal(['skills'])}
    >
      <img
        src="/src/Public/add.png"
        alt="Add"
        className="w-6 h-6"
      />
    </button>
  </div>
)}

    </div>
    <div className="row skill-row grid grid-cols-2 md:grid-cols-7 gap-4">
      {user.skill.map((skill: string, index: number) => (
        <div key={index} className="col-md-3">
          <div className="relative skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <h4 className="text-md font-semibold mb-1">{skill}</h4>
            {isCurrentUser && (
  <div className="absolute bottom-1 right-2">
    <button
      className="p-2 rounded-full shadow"
      onClick={() => handleDelete(index, 'skill')}
    >
      <img
        src="/src/Public/delete.png"
        alt="Delete"
        className="w-4 h-4"
      />
    </button>
  </div>
)}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>



        {/* <!--*************** My SKills ends Here ***************--> */}

         {/* <!--*************** My posts starts Here ***************--> */}

         <div id="blog" className="container-fluid bg-gray-100 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Recent Posts</h2>
          <p className="text-gray-600">
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
  {(!isCurrentUser && !isFollowed) ? (
    <p className="text-center text-gray-500">You need to follow this user to see their posts.</p>
  ) : (
    posts.map((post) => (
      <div key={post._id} className="bg-white p-3 shadow-sm rounded-lg mb-4 max-w-xs w-full">
        <img src={post.images[0]} alt="Post Image" className="w-full h-32 object-cover mb-2 rounded"/>
        <span className="text-gray-400 text-xs">{new Date(post.postAt).toLocaleString()}</span>
        <p className="text-gray-600 text-sm mt-2">
          {post.caption}
        </p>
      </div>
    ))
  )}
</div>
      </div>
    </div>

   {/* <!--*************** My posts ends Here ***************--> */}


   <UserListModal 
  isOpen={isUserListModalOpen} 
  onClose={() => setIsUserListModalOpen(false)} 
  title={modalTitle}  // e.g., "Likes" or "Followers"
  users={modalUsers}   // e.g., users from likes or followers/following
/>

    </div>
  );
};

export default Profile;
