import { FaUserCircle, FaRegEdit, FaRegBookmark, FaRegClock, FaRegFileAlt } from 'react-icons/fa';
import Noposts from '../../Components/user/Noposts';
import Navbar from '../../Components/user/navbar'
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store'
import CreatePostModal from '../../Components/user/handlePost'
import { useState, useEffect } from 'react';
import { userPost } from '../../api/user/post';
import { Link } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { fetchFollowingPosts } from '../../api/user/get';
import Posts from '../../Components/user/posts';
import Loading from '../../Components/loading';

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

  // Dummy data for user suggestions
  const suggestedUsers = [
    { id: 1, name: 'John Doe', title: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', title: 'Product Manager' },
    { id: 3, name: 'Alex Johnson', title: 'UI/UX Designer' },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar user={user} />
      <div className="max-w-7xl mx-auto px-8 py-8 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Left Sidebar - Profile and Activity */}
          <div className="md:col-span-1 space-y-4">
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
                    {user.skill.slice(0, 3).join(' || ')}{user.skill.length > 3 ? ' || ...' : ''}
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

            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Your Activity</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-gray-600">
                  <FaRegClock className="mr-2" />
                  <span>Recent Activity</span>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FaRegFileAlt className="mr-2" />
                  <Link to="/posts" className="hover:text-blue-600 transition duration-300">
                    Your Posts
                  </Link>
                </li>
                <li className="flex items-center text-sm text-gray-600">
                  <FaRegBookmark className="mr-2" />
                  <span>Saved Items</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Middle - Posts Feed */}
          <div className="md:col-span-2 h-[calc(100vh-120px)] overflow-y-auto pr-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="space-y-4">
              {isLoading ? (
                <Loading />
              ) : posts.length > 0 ? (
                <Posts user={user} posts={posts} isUser={false} />
              ) : (
                <Noposts />
              )}
            </div>
          </div>
          {/* Right Sidebar - Create Post and User Suggestions */}
          <div className="md:col-span-1 space-y-4">
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

            <div className="bg-white shadow rounded-lg p-4">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Suggested Connections</h3>
              <ul className="space-y-3">
                {suggestedUsers.map((user) => (
                  <li key={user.id} className="flex items-center">
                    <FaUserCircle className="w-8 h-8 text-gray-400 mr-2" />
                    <div>
                      <p className="font-medium text-sm text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-600">{user.title}</p>
                    </div>
                    <button className="ml-auto bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs hover:bg-blue-200 transition duration-300">
                      Connect
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <CreatePostModal isOpen={isModalOpen} onClose={toggleModal} onSave={handleSavePost} />
    </div>
  );
};

export default Home;
