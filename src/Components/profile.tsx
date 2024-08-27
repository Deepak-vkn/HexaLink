import React, { useState,useEffect } from 'react';
import Modal from './modal';
import { updateUser,updateEducation } from '../api/user/post';
import { getUserPosts } from '../api/user/get'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
interface UserProfileProps {
  user?: any
}
interface Post {
  image: string;
  caption: string;
  postAt: string; 
}

const Profile: React.FC<UserProfileProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldsToShow, setFieldsToShow] = useState<string[]>([]);
  const [userData, setUserData] = useState<any | null>(user);
  const [posts, setPosts] = useState<Post[]>([]);


  const handleOpenModal = (fields: string[]) => {
      setFieldsToShow(fields);
      setIsModalOpen(true);
  };
  const handleCloseModal = () => {
      setIsModalOpen(false);
  };
  const handleSaveChanges = async (updatedUser: any) => {
      try {
          // Function to find changed fields
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

          // Find the changed fields
          const changedFields = getChangedFields(userData, updatedUser);

          // If there are no changes, do nothing
          if (Object.keys(changedFields).length === 0) {
              console.log('No changes detected.');
              handleCloseModal();
              return;
          }

          // Send the changed fields along with the user ID to the backend
          const response = await updateUser(userData?._id, changedFields);
          console.log('User updated successfully:', response);
          if (response && response.success) {
              
              // Update local user state with the updated user object from the backend
              setUserData((prevUserData) => {
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


  const handleDelete = async (index: number,field) => {
    try {
      const response = await updateEducation(user._id, index,field);
      
      // Check the response to determine if the update was successful
      if (response.success) {
        toastr.success(response.message);
        // Update the UI state after successful deletion if needed
        // e.g., setEducation(prev => prev.filter((_, i) => i !== index));
      } else {
        toastr.error(response.message);
      }
    } catch (error) {
      console.error('Error deleting education:', error);
      toastr.error('Error deleting education');
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user._id) {
        try {
          console.log('Fetching posts for userId:', user._id);
          const postsData = await getUserPosts(user._id);


          if (postsData.success) {
            setPosts(postsData.posts || []);
           
          } else {
            toastr.error(postsData.message);
          }
        } catch (error) {
          toastr.error('Error fetching posts');
          console.error('Error fetching posts:', error);
        }
      }
    };
    fetchPosts();
    
      setUserData(user);
  }, [user]);

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
      <span className="text-2xl font-semibold ">244</span>
      <span className="text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">Following</span>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-2xl font-semibold">200</span>
      <span className="text-sm px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300">Followers</span>
    </div>
  </div>
</div>
<div className="absolute bottom-4 right-4">
    <button className=" text-white p-2 rounded-full shadow "   onClick={() => handleOpenModal(['name','role'])} >
      <img
        src="\src\Public\edit-editor-pen-pencil-write-icon--4.png"
        alt="Edit"
        className="w-6 h-6"
      />
    </button>
  </div>
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
    <div className="absolute bottom-4 right-4">
      <a className=" p-2 rounded-full shadow hover:cursor-pointer"  onClick={() => handleOpenModal(['about','image'])}>
        <img
          src="\src\Public\edit-editor-pen-pencil-write-icon--4.png"
          alt="Edit"
          className="w-6 h-6"
        />
      </a>
    </div>
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
          <div className="absolute top-0 right-0 mt-4 mr-4">
            <a
              className="p-2 rounded-full shadow hover:cursor-pointer"
              onClick={() => handleOpenModal(['education'])}
            >
              <img
                src="/src/Public/add.png"
                alt="Add"
                className="w-6 h-6"
              />
            </a>
          </div>
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
                  <div className="absolute bottom-4 right-4 flex space-x-2">
                    <a className="p-2 rounded-full shadow hover:bg-gray-100"  onClick={() => handleDelete(index,'education')}>
                      <img
                        src="/src/Public/delete.png"
                        alt="Delete"
                        className="w-4 h-4"
                      />
                    </a>
                  </div>
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
      <div className="absolute bottom-3 right-4">
                <a className="p-2 rounded-full shadow hover:cursor-pointer"    onClick={() => handleOpenModal(['skills'])}>
                    <img
                        src="\src\Public\add.png" 
                        alt="Add"
                        className="w-6 h-6"
                    />
                </a>
              </div>
    </div>
    <div className="row skill-row grid grid-cols-2 md:grid-cols-7 gap-4">
      {user.skill.map((skill: string, index: number) => (
        <div key={index} className="col-md-3">
          <div className="relative skill-col bg-white p-4 text-center rounded-lg shadow-md transition duration-300 hover:shadow-lg">
            <h4 className="text-md font-semibold mb-1">{skill}</h4>
            <div className="absolute bottom-1 right-2">
              <button
                className="p-2 rounded-full shadow"
                onClick={() => handleDelete(index,'skill')}
              >
                <img
                src="\src\Public\delete.png" 
                alt="Edit"
                className="w-4 h-4"
            />
              </button>
            </div>
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


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {posts.map((post) => (
          <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <img src={post.image} alt="Blog 1" className="w-full mb-4 rounded"/>
            <span className="text-gray-500 text-sm">{new Date(post.postAt).toLocaleString()}</span>
          
            <p className="text-gray-700 text-base">
            {post.caption}
            </p>
          </div>  ))}

          
          

         
        </div>
      </div>
    </div> 

   {/* <!--*************** My posts ends Here ***************--> */}

    </div>
  );
};

export default Profile;
