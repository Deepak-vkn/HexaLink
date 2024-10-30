import  { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FaUser, FaClock, FaBriefcase } from 'react-icons/fa'
import { fetchSavedItems,saveItem } from '../../api/user/get'
import {  BsFillSaveFill } from 'react-icons/bs';
import LeftActivityBar from '../../Components/user/leftBottom';
import LeftTopBox from '../../Components/user/leftTopBox';
import PostModal from '../../Components/user/postModal'

export default function SavedItems() {
  const user = useSelector((state: any) => state.user.userInfo)
  const [isLoading, setIsLoading] = useState(false)
  const [savedItems, setSavedItems] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<'Posts' | 'Jobs'>('Jobs');
  const [selectedPost, setSelectedPost] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const fetchSavedPosts = async (type: 'Posts' | 'Jobs') => {
    setIsLoading(true);
    try {
      const response = await fetchSavedItems(user._id, type);
      if (response.success) {
        setSavedItems(response.savedDoc);
      }
    } catch (error) {
      console.error('An error occurred while fetching saved items:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSavedPosts(activeCategory);
  }, [activeCategory, user._id]);


  const viewPost = async (postId: string) => {
      setSelectedPost(postId)
      setIsModalOpen(true);
  };

  

  const handleUnSaveClick = async (postId: string,type:string) => {
    try {
      const response = await saveItem(user._id, postId,type);
      console.log(user._id, postId,type)
      if (response.success) { 
        setSavedItems((prevItems) => prevItems.filter(item => item.targetId._id !== postId));
       
      }
    } catch (error) {
      console.error('An error occurred while saving the post:', error);
    }
  };

  const filteredItems = savedItems.filter(item => 
    activeCategory === 'Posts' ? item.type === 'Posts' : item.type === 'Jobs'
  )


  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedPost('null'); 
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Left Sidebar - Profile and Activity */}
          <div className="md:col-span-1 space-y-4">
            
            <LeftTopBox user={user}/>

           <LeftActivityBar/>
          </div>
          {/* Middle - Saved Items Feed */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Saved Items</h2>
              
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : filteredItems.length > 0 ? (
                <div className="space-y-4">
                  {activeCategory === 'Posts' ? (
                    filteredItems.map((post) => (
                      <div key={post._id} className="border rounded-lg p-4">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {post.targetId.userId?.image ? (
                              <img src={post.targetId.userId.image} alt={post.targetId.userId?.name} className="w-full h-full object-cover" />
                            ) : (
                              <FaUser className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{post.targetId.userId?.name}</p>
                            <p className="text-sm text-gray-600">{new Date(post.targetId.postAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <p className="text-sm mb-4">{post.targetId.caption.substring(0, 200)}...</p>
                        {post.targetId.images && post.targetId.images.length > 0 && (
                          <img src={post.targetId.images[0]} alt="Post" className="w-full h-48 object-cover rounded-md mb-4" />
                        )}
                        <div className="flex justify-between">
                        <button
      className="text-blue-600 text-sm font-medium hover:text-blue-700 transition duration-300"
      onClick={() => viewPost(post.targetId._id)}
    >
      View Post
    </button>
                          <button className="text-gray-600 hover:text-red-500 transition duration-300" onClick={() => handleUnSaveClick(post.targetId._id,'Posts')}>
      <BsFillSaveFill className="h-5 w-5" />
    </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    filteredItems.map((job) => (
                      <div key={job._id} className="border rounded-lg p-4">
  <h3 className="text-lg font-semibold mb-2">{job.targetId.title}</h3>
  <p className="text-sm text-gray-600 mb-4">{job.targetId.companyId?.name}</p>
  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
    <div className="flex items-center">
      <FaBriefcase className="mr-2 h-4 w-4" />
      {job.targetId.experience} years
    </div>
    <div className="flex items-center">
      <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">{job.targetId.level}</span>
    </div>
    <div className="flex items-center">
      <FaClock className="mr-2 h-4 w-4" />
      Expires: {new Date(job.targetId.expires).toLocaleDateString()}
    </div>
    <div className="flex items-center">
      <span className="px-2 py-1 bg-gray-200 rounded-full text-xs">{job.targetId.location}</span>
    </div>
  </div>
  <p className="text-sm mb-4">{job.targetId.description.substring(0, 100)}...</p>
  
  {/* Flex container for buttons */}
  <div className="flex justify-between items-center">
    <Link to={`/jobs/${job.targetId._id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 inline-block">
      View Job Details
    </Link>
    <button className="text-gray-600 hover:text-red-500 transition duration-300"      onClick={() => handleUnSaveClick(job.targetId._id,'Jobs')}>
      <BsFillSaveFill className="h-5 w-5" />
    </button>
  </div>
</div>
                    ))
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-gray-600">No saved {activeCategory.toLowerCase()} available</div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Saved Item Categories */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Saved Item Categories</h3>
              <div className="space-y-2">
              <button
                className={`w-full text-left py-2 px-3 rounded-md transition duration-300 ${
                  activeCategory === 'Posts' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveCategory('Posts');
                  fetchSavedPosts('Posts'); 
                }}
              >
                Saved Posts
              </button>

              <button
  className={`w-full text-left py-2 px-3 rounded-md transition duration-300 ${
    activeCategory === 'Jobs' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
  }`}
  onClick={() => setActiveCategory('Jobs')}
>
  Saved Jobs 
</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && selectedPost && (
        <PostModal postId={selectedPost} onClose={closeModal} user={user}/>
      )}
    </div>
  )
}