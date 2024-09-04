
import Navbar from '../../Components/user/navbar'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
import CreatePostModal from '../../Components/user/handlePost'
import { useState,useEffect } from 'react';
import { userPost } from '../../api/user/post';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { fetchFollowingPosts } from '../../api/user/get';
import Posts from '../../Components/user/posts';


const home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user:any = useSelector((state: RootState) => state.user.userInfo);
  const [posts, setPosts] = useState([]);



  useEffect(() => {
    console.log('logged user is ',user)
    
    const fetchPosts = async () => {
      if (user && user._id) {
        try {
          console.log('Fetching posts for userId:', user);
          const postsData = await fetchFollowingPosts(user._id);

          console.log('PostsData:', postsData);

          if (postsData.success) {
            setPosts(postsData.postDoc || []);
          } else {
            alert(postsData.message || 'No posts found.');
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchPosts();
  }, [user?._id]); 

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleSavePost = async (file: File | null, caption: string) => {
    if (file && user?._id) {
      const reader = new FileReader();
  
      reader.onloadend = async () => {
       
        const base64String = reader.result as string;
  
        const formData = new FormData();
        formData.append('file', base64String);
        formData.append('caption', caption);
        formData.append('userId', user._id); 
  
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
        src={user?.image || 'https://via.placeholder.com/150'}
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
     <Posts user={user} posts={posts} isUser={false}/>
       <div className="fixed top-20 right-20 w-64 bg-gray-100 p-4 rounded-lg shadow-md text-center" onClick={toggleModal}>
          <h3 className="text-lg font-semibold mb-4">CREATE POST</h3>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="What's on your mind?"
          />
          <button className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600">
           Create  Post
          </button>
        </div>
      {/* Create Post Modal */}
      <CreatePostModal isOpen={isModalOpen} onClose={toggleModal}    onSave={handleSavePost}/>
    </div>
  )
}

export default home
