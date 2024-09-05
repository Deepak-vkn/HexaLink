import React, { useState, useEffect } from 'react';
import { FaRegComment } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import { MdOutlineThumbUp } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { likePost,deletePost } from '../../api/user/get';
import CreatePostModal from './handlePost'
import { updatePost,addComment } from '../../api/user/post';
import CommentModal from './commentModal';
import loading  from '../loading';

interface Post {
  _id: string;
  userId: any;
  likes:  any ;
  image: string | null;
  caption: string;
  comments: any[];
  postAt: string;
  __v: number;
}

interface PostsProps {
  posts: Post[];
  user: { _id: string };
  isUser?:boolean
}

const Posts: React.FC<PostsProps> = ({ posts, user ,isUser=false}) => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [postsState, setPostsState] = useState<Post[]>([]);
  const [activePostMenu, setActivePostMenu] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);  // State for modal visibility
  const [editingPost, setEditingPost] = useState<Post | null>(null);  // State for the post being edited
  const [isCommnetModalOpen, setIsCommnetModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    console.log('Setting postsState with posts:', posts);
    setPostsState(posts);
  }, [posts]);

  const handleOpenCommentModal = (postId: string) => {
    setSelectedPostId(postId);
    setIsCommnetModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommnetModalOpen(false);
    setSelectedPostId(null);
  };

  const handleAddComment = async (message: string) => {
    if (selectedPostId) {
      try {
        const response = await addComment(selectedPostId, user._id, message);
        if (response.success) {
          const updatedPost = response.postDoc;
          setPostsState(prevPosts =>
            prevPosts.map(post =>
              post._id === selectedPostId ? updatedPost : post
            )
          );
          console.log('Comment added successfully');
        } else {
          console.error('Failed to add comment:', response.message);
        }
      } catch (error) {
        console.error('An error occurred while adding the comment:', error);
      }
    }
    // handleCloseCommentModal();
  };

  const handleLikeClick = async (postId: string) => {
    try {
      const response = await likePost(postId, user._id);
      if (response.success) {
        console.log('updted post is ', response.postDoc)
        const updatedPost = response.postDoc;
        setPostsState(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? updatedPost : post
          )
        );
        console.log('Post liked successfully');
      } else {
        console.error('Failed to like the post:', response.message);
      }
    } catch (error) {
      console.error('An error occurred while liking the post:', error);
    }
  };

  const toggleMenu = (postId: string) => {
    setActivePostMenu(activePostMenu === postId ? null : postId);
  };
  const openEditModal = (post: Post) => {
    setEditingPost(post);  // Set the post to be edited
    setIsModalOpen(true);  // Open the modal
    toggleMenu(post._id)
  };
  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
    setEditingPost(null);  // Clear the editing post
  };
  const deletePostFunction =async  (postId:string) => {

    const response=await deletePost(postId)
    if (response.success) {
      // Refresh or update the posts list
      setPostsState(posts.filter(post => post._id !== postId));
    }
  };
  const handleSave = async (file: File | null, caption: string,postId?:string) => {
    // Handle saving the updated post here
    if(postId){
      const response=await updatePost(caption,postId)

      if(response.success){
        const updatedPost = response.postDoc;
        setPostsState(prevPosts =>
          prevPosts.map(post =>
            post._id === postId ? updatedPost : post
          )
        );
      }
      else{
        console.error('Failed to like the post:', response.message);
      }
    }
   
    console.log('Saving post:', { file, caption });
    // Implement the logic to update the post in your state and backend
  };

  return (
    <div className="space-y-4">
      {postsState.length === 0 ? (
        <div className="text-center mt-10">
          <p className="text-gray-500">No posts available.</p>
          <p className="text-gray-600">Follow your friends to see their latest posts!</p>
        </div>
      ) : (
        postsState.map((post) => (
          <div key={post._id} className="relative max-w-screen-md py-6 px-4 mx-auto bg-white shadow-md rounded-xl">
            {/* User Info Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {post.userId.image ? (
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={post.userId.image}
                    alt="User profile"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
                    {post.userId.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="ml-3">
                  <h4 className="font-semibold text-blue-gray-900">{post.userId.name}</h4>
                  <p className="text-gray-500 text-sm">{new Date(post.postAt).toLocaleString()}</p>
                </div>
              </div>
              {/* Three-dot menu */}
              {isUser && (
                <div className="relative">
                  <button
                    className="text-gray-600 focus:outline-none"
                    onClick={() => toggleMenu(post._id)}
                  >
                    <CiMenuKebab size={24} />
                  </button>
                  {activePostMenu === post._id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 z-10">
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
  
            {/* Post Content */}
            <div className="relative flex flex-col mb-4 overflow-hidden text-gray-700 bg-white rounded-lg bg-clip-border">
              {post.image ? (
                <>
                  <img
                    alt="Post"
                    className="h-[32rem] w-full object-contain object-center"
                    src={post.image}
                  />
                  {/* Small Info Div */}
                  <div className="flex justify-between items-center py-2 px-4 bg-gray-100 border-t border-gray-200">
                    <span className="text-xs text-gray-600">{`Likes ${post.likes.length}`}</span>
                    <span className="text-xs text-gray-600">{`Comments ${post.comments.length}`}</span>
                  </div>
                  {/* Icons */}
                  <div className="flex justify-center mt-2">
                    <div className="flex space-x-4 bg-gray-100 py-1 px-4 rounded-full shadow-lg">
                      <button className="p-2 rounded-full flex flex-col items-center" onClick={() => handleLikeClick(post._id)}>
                        <MdOutlineThumbUp
                          size={24}
                          className={post.likes.some(like => like.userId._id === user._id) ? 'text-blue-500' : 'text-gray-500'}
                        />
                      </button>
                      <button className="p-2 rounded-full" onClick={() => handleOpenCommentModal(post._id)}>
                        <FaRegComment size={24} />
                      </button>
                      <button className="p-2 rounded-full">
                        <BsSave2 size={24} />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="relative flex flex-col mb-4 overflow-hidden text-gray-700 bg-white rounded-lg bg-clip-border">
                  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    No image available
                  </p>
                </div>
              )}
              {/* Post Text */}
              <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700 mt-4">
                {post.caption}
              </p>
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
        isOpen={isCommnetModalOpen}
        onClose={handleCloseCommentModal}
        comments={selectedPostId ? postsState.find(post => post._id === selectedPostId)?.comments || [] : []}
        onAddComment={handleAddComment}
      />
    </div>
  );
  
};

export default Posts;
