
import Noposts from '../../Components/user/Noposts';
import { useSelector } from 'react-redux';
import CreatePostModal from '../../Components/user/handlePost'
import { useState, useEffect } from 'react';
import { userPost } from '../../api/user/post';
import { UserCircle } from 'lucide-react'
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { fetchFollowingPosts } from '../../api/user/get';
import Posts from '../../Components/user/posts';
import Loading from '../../Components/Loading';
import FollowSuggesion from '../../Components/user/followSuggesion';
import LeftActivityBar from '../../Components/user/leftBottom';
import LeftTopBox from '../../Components/user/leftTopBox';


const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector((state:any) => state.user.userInfo);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (user && user._id) {
        setIsLoading(true);
        try {
          const postsData = await fetchFollowingPosts(user._id);
          if (postsData.success) {
            setPosts(postsData.postDoc || []);
          }
        } catch (error) {
          console.error('Error fetching posts:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchPosts();
  }, [user?._id]);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleSavePost = async (files: File[] | null, caption: string) => {
    if (!files || files.length === 0 || !user?._id) {
      toastr.error('No files selected or user ID is missing');
      return;
    }
  
    if (files.length > 4) {
      toastr.error('You can upload up to 4 images only');
      return;
    }
  
    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('userId', user._id);
  
    const base64Images: string[] = [];
    const readFilePromises = files.map((file) => {
      return new Promise<void>((resolve, reject) => {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const base64String = reader.result as string;
          base64Images.push(base64String);
          resolve();
        };
  
        reader.onerror = () => {
          reject(new Error('Failed to read file'));
        };
  
        reader.readAsDataURL(file);
      });
    });
  
    try {
      await Promise.all(readFilePromises);
  
      // Append all base64 images to FormData as an array
      base64Images.forEach((base64String) => {
        formData.append('images', base64String);
      });
  
      // Send the request to the backend
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
  

  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="max-w-7xl mx-auto px-8 py-8 sm:px-12 lg:px-16">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        
        {/* Left Sidebar - Profile and Activity */}
        <div className="md:col-span-1 space-y-4 hidden md:block">
          <LeftTopBox user={user} />
          <LeftActivityBar />
        </div>
  
        {/* Middle - Posts Feed */}
        <div className="md:col-span-2 h-[calc(100vh-120px)] overflow-y-auto pr-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

        {/* Create Post Section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-4 block md:hidden">
              <div className="flex items-center space-x-4 mb-4">
              {user?.image ? (
          <img
            className="w-10 h-10 rounded-full object-cover mb-3"
            src={user.image}
            alt={`${user?.name}'s profile`}
          />
        ) : (
          <UserCircle className="w-10 h-10 text-gray-400" />
        )}    
         <div 
              className="flex-grow bg-gray-100 rounded-full py-2 px-4 cursor-text"
              onClick={toggleModal}
                >
                  <p className="text-gray-500">Start a post</p>
                </div>
              </div>
            </div>



          <div className="space-y-4">
            {isLoading ? (
              <Loading />
            ) : posts.length > 0 ? (
              <Posts user={user} posts={posts} isUser={false} />
            ) : (
              <Noposts title="No posts yet" />
            )}
          </div>
        </div>
  
        {/* Right Sidebar - Create Post and User Suggestions */}
        <div className="md:col-span-1 space-y-4 hidden md:block">
          <div className="bg-white rounded-lg shadow-md p-4">
            <textarea
              className="w-full p-2 mb-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              rows={3}
              placeholder="What's on your mind?"
            />
            <button
              className="w-full bg-blue-500 text-white py-1.5 px-3 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out text-sm"
              onClick={toggleModal}
            >
              Create Post
            </button>
          </div>
          <FollowSuggesion />
        </div>
      </div>
    </div>
  
    <CreatePostModal isOpen={isModalOpen} onClose={toggleModal} onSave={handleSavePost} />
  </div>
  
  );
};

export default Home;
