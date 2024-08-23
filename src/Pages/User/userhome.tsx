
import Navbar from '../../Components/user/navbar'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
import CreatePostModal from '../../Components/user/handlePost'
import { useState } from 'react';
import { userPost } from '../../api/user/post';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user:any = useSelector((state: RootState) => state.user.userInfo);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSavePost = async (file: File | null, caption: string) => {
    if (file && user?._id) {
      const reader = new FileReader();
  
      reader.onloadend = async () => {
        // Convert the file to Base64 string
        const base64String = reader.result as string;
  
        const formData = new FormData();
        formData.append('file', base64String);
        formData.append('caption', caption);
        formData.append('userId', user._id); // Ensure user._id is in the correct format
  
        try {
          const response = await userPost(formData);
  
          if (response.success) {
            toastr.success(response.message || 'Post created successfully');
          } else {
            toastr.error(response.message || 'Failed to create post');
          }
        } catch (error) {
          toastr.error('Failed to create post');
        }
      };
  
      // Read the file as Data URL
      reader.readAsDataURL(file);
    } else {
      toastr.error('File or user ID is missing');
    }
  };
  return (
    <div>
      <Navbar user={user}/>
      <div className="fixed top-20 left-20 w-64 bg-gray-100 p-4 rounded-lg shadow-md text-center">
      {/* Profile Picture */}
      <img
        className="w-16 h-16 rounded-full mx-auto object-cover"
        
        alt={`${user?.name}'s profile`}
      />
      {/* User Name */}
      <h3 className="text-lg font-semibold mt-2 mb-4">{user?.name}</h3>
      {/* Create Post Button */}
      <Link
        to="/posts"
        className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 block text-center"
      >
        Post
      </Link>
    </div>
      <div className="max-w-screen-md  py-6 px-4 mx-auto bg-white shadow-md rounded-xl">
  {/* User Info Section */}
  <div className="flex items-center mb-4">
    <img
      className="w-12 h-12 rounded-full object-cover"
      src="https://via.placeholder.com/150"
      alt="User profile"
    />
    <div className="ml-3">
      <h4 className="font-semibold text-blue-gray-900">John Doe</h4>
      <p className="text-gray-500 text-sm">2 hours ago</p>
    </div>
  </div>
  {/* Post Content */}
  <div className="relative flex flex-col mb-4 overflow-hidden text-gray-700 bg-white rounded-lg bg-clip-border">
    <img
      alt="Post"
      className="h-[32rem] w-full object-cover object-center"
      src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2717&amp;q=80"
    />
  </div>
  {/* Post Caption */}
  <h2 className="mb-2 block font-sans text-2xl font-semibold leading-[1.3] tracking-normal text-blue-gray-900 antialiased">
    User Home Page
  </h2>
  {/* Post Text */}
  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
    Can you help me out? you will get a lot of free exposure doing this can
    my website be in english?. There is too much white space do less with
    more, so that will be a conversation piece can you rework to make the
    pizza look more delicious other agencies charge much lesser can you make
    the blue bluer?. I think we need to start from scratch can my website be
    in english?, yet make it sexy i&apos;ll pay you in a week we don&apos;t
    need to pay upfront i hope you understand can you make it stand out
    more?. Make the font bigger can you help me out? you will get a lot of
    free exposure doing this that&apos;s going to be a chunk of change other
    agencies charge much lesser. Are you busy this weekend? I have a new
    project with a tight deadline that&apos;s going to be a chunk of change.
    There are more projects lined up charge extra the next time.
  </p>
</div>
       <div className="fixed top-20 right-20 w-64 bg-gray-100 p-4 rounded-lg shadow-md text-center" onClick={toggleModal}>
          <h3 className="text-lg font-semibold mb-4">CREATE POST</h3>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's on your mind?"
          />
          <button className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600">
            Post
          </button>
        </div>
      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={toggleModal}    onSave={handleSavePost}/>
    </div>
  )
}

export default home
