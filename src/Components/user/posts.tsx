import React, { useState, useEffect } from 'react';
import { FaRegComment,FaThumbsUp  } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import { CiMenuKebab } from "react-icons/ci";
import { likePost, deletePost,deletePostComments,saveItem,fetchSavedItems } from '../../api/user/get';
import CreatePostModal from './handlePost';
import { updatePost, addComment } from '../../api/user/post';
import CommentModal from './commentModal';
// import Loading from '../loading';
import LikeModal from './likeModal';



import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  adaptiveHeight: true
};



// interface User {
//   _id: string;
//   name: string;
//   image?: string;
// }

// interface Like {
//   userId: User;
// }

// interface Comment {
//   _id: string;
//   userId: User;
//   message: string;
//   time: string;
// }

interface Post {
  _id: string;
  userId: any;
  likes:  any ;
  images: string[] | null;
  caption: string;
  comments: any[];
  postAt: string;
  __v: number;
}


interface PostsProps {
  posts: Post[];
  user: { _id: string }| null;
  isUser?:boolean
}

const Posts: React.FC<PostsProps> = ({ posts, user, isUser = false }) => {
  const [postsState, setPostsState] = useState<Post[]>(posts);
  const [activePostMenu, setActivePostMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState<boolean>(false);
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const maxCaptionLength = 100; 



const handleOpenLikeModal = (postId: string) => {
  setSelectedPostId(postId);
  setIsLikeModalOpen(true);
};

const handleCloseLikeModal = () => {
  setIsLikeModalOpen(false);
  setSelectedPostId(null);
};

  const toggleShowMore = () => {
    setShowMore(prev => !prev);
  };
  useEffect(() => {
    setPostsState(posts);
  }, [posts]);

  useEffect(() => {
    // Fetch saved items when the component mounts
    const fetchSavedPosts = async () => {
      try {
        if(user){
          const response = await fetchSavedItems(user?._id,'Posts');
          console.log()
          if (response.success) {
            console.log('saved doc are ',response.savedDoc)
            setSavedItems(response.savedDoc.map((item:any) => item.originalTargetId));
          }
        }
       
      } catch (error) {
        console.error('An error occurred while fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, [user?._id]);

  const handleOpenCommentModal = (postId: string) => {
    setSelectedPostId(postId);
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
    setSelectedPostId(null);
  };

  const handleAddComment = async (message: string) => {
    if (selectedPostId) {
      try {
        if(user){
          const response = await addComment(selectedPostId, user._id, message);
          if (response.success) {
            const updatedPost = response.postDoc;
            setPostsState(prevPosts =>
              prevPosts.map(post =>
                post._id === selectedPostId ? updatedPost : post
              )
            );
          }
        }
        
      } catch (error) {
        console.error('An error occurred while adding the comment:', error);
      }
    }
  };

  const handleLikeClick = async (postId: string) => {
    try {
      if(user){
        const response = await likePost(postId, user._id);
        if (response.success) {
          const updatedPost = response.postDoc;
          setPostsState(prevPosts =>
            prevPosts.map(post =>
              post._id === postId ? updatedPost : post
            )
          );
        }
      }
     
    } catch (error) {
      console.error('An error occurred while liking the post:', error);
    }
  };

  const handleSaveClick = async (postId: string) => {
    try {
      if(user){
        const response = await saveItem(user._id, postId, 'Posts');
        if (response.success) {
          console.log('Post save successful');
    
  
          if (savedItems.includes(postId)) {
           
            setSavedItems((prevItems) => prevItems.filter((item) => item !== postId));
            console.log(`Post ${postId} removed from saved items`);
          } else {
            setSavedItems((prevItems) => [...prevItems, postId]);
            console.log(`Post ${postId} added to saved items`);
          }
        }
      }
   
    } catch (error) {
      console.error('An error occurred while saving the post:', error);
    }
  };
  

  const toggleMenu = (postId: string) => {
    setActivePostMenu(activePostMenu === postId ? null : postId);
  };

  const openEditModal = (post: Post) => {
    setEditingPost(post);
    setIsModalOpen(true);
    toggleMenu(post._id);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const deletePostFunction = async (postId: string) => {
    const response = await deletePost(postId);
    if (response.success) {
      setPostsState(postsState.filter(post => post._id !== postId));
    }
  };

  const handleSave = async (file: File[] | null, caption: string, postId?: string) => {
    if (postId) {
      const response = await updatePost(caption, postId);
      if (response.success) {
        const updatedPost = response.postDoc;
        setPostsState(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? updatedPost : post
          )
        );
      } else {
        console.log(file); 
      }
    }
  };
  

  const handleDeleteComment = async (commentIndex: number) => {
    if (selectedPostId) {
      try {
        const response = await deletePostComments(selectedPostId, commentIndex);
        
        if (response.success) {
         
          const updatedPost = response.populatedPost;
  
          if (updatedPost) {

            setPostsState(prevPosts =>
              prevPosts.map(post =>
                post._id === selectedPostId ? updatedPost : post
              )
            );
          } else {
            console.error('Updated post data not available in response.');
          }
        } else {
          console.error('Failed to delete comment:', response.message);
        }
      } catch (error) {
        console.error('An error occurred while deleting the comment:', error);
      }
    }
  };
  


  return (
    <div className="max-w-2xl mx-auto">
      {postsState.length === 0 ? (
        <div className="text-center mt-10 bg-white p-6 rounded-lg shadow-">
          <p className="text-gray-500 text-xl mb-2">No posts available.</p>
          <p className="text-gray-600">Follow your friends to see their latest posts!</p>
        </div>
      ) : (
        postsState.map((post) => (
          <div key={post._id} className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
            {/* User Info and Menu */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                {post.userId.image ? (
                 <img
                 className="w-12 h-12 rounded-full object-cover"
                 src={post.userId.image}
                 alt="User profile"
               />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                    {post.userId.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">{post.userId.name}</h4>
                  <p className="text-gray-500 text-xs">{new Date(post.postAt).toLocaleString()}</p>
                </div>
              </div>
              {isUser && (
                <div className="relative">
                  <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => toggleMenu(post._id)}
                  >
                    <CiMenuKebab size={20} />
                  </button>
                  {activePostMenu === post._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => openEditModal(post)}>
                        Edit
                      </button>
                      <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => deletePostFunction(post._id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Post Caption */}
             <p className="p-4 text-gray-800">
        {showMore || post.caption.length <= maxCaptionLength
          ? post.caption
          : `${post.caption.substring(0, maxCaptionLength)}...`}
        {post.caption.length > maxCaptionLength && (
          <button
            className="text-gray-500 ml-1 text-sm hover:underline focus:outline-none"
            onClick={toggleShowMore}
          >
            {showMore ? 'Show less' : 'Show more'}
          </button>
        )}
      </p>
   
{post.images && post.images.length > 0 && (
  <div className="relative w-full h-80 overflow-hidden">
    <Slider {...sliderSettings} className="relative w-full h-full">
      {post.images.map((image: string, index: number) => (
        <div key={index} className="w-full h-80 flex items-center justify-center bg-gray-100">
          <img
            src={image}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}
    </Slider>
  </div>
)}


            {/* Like and Comment Count */}
            <div className="px-4 py-2 bg-gray-50 text-sm text-gray-500 flex justify-between">
              <span  onClick={() => handleOpenLikeModal(post._id)} >{post.likes.length} likes</span>
              <span>{post.comments.length} comments</span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around p-2 border-t border-gray-200">
              <button 
                className="flex items-center space-x-2 text-gray-500  transition duration-200"
                onClick={() => handleLikeClick(post._id)}
              >
                {post.likes.some((like :any)=> like.userId._id === user?._id) ? (
                  <FaThumbsUp  className="text-blue-500" size={18} />
                ) : (
                  <FaThumbsUp  size={18} />
                )}
                <span>Like</span>
              </button>
              <button 
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition duration-200"
                onClick={() => handleOpenCommentModal(post._id)}
              >
                <FaRegComment size={20} />
                <span>Comment</span>
              </button>
              <button
        className={`flex items-center space-x-2 transition duration-200 ${
          savedItems.includes(post._id) ? 'text-blue-500' : 'text-gray-500'
        }`}
        onClick={() => handleSaveClick(post._id)}
      >
        <BsSave2 size={20} className={savedItems?.includes(post._id) ? 'text-blue-500' : ''} />
        <span>{savedItems.includes(post._id) ? 'Saved' : 'Save'}</span>
      </button>
  
       
            </div>
          </div>
        ))
      )}
 {editingPost && (
        <CreatePostModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={handleSave}
          isEditing={!!editingPost}  // true if editing a post
          post={editingPost}  // Pass the post to be edited
        />
      )}
  
  <CommentModal
  isOpen={isCommentModalOpen}
  onClose={handleCloseCommentModal}
  comments={postsState.find(post => post._id === selectedPostId)?.comments || []}
  onAddComment={handleAddComment}
  onDeleteComment={handleDeleteComment} // Pass delete handler
/>

<LikeModal
  isOpen={isLikeModalOpen}
  onClose={handleCloseLikeModal}
  title='likes'
  users={postsState.find(post => post._id === selectedPostId)?.likes.map((like:any) => like.userId) || []}
/>

    </div>
  );
};

export default Posts;
