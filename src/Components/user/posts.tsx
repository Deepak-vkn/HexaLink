import React, { useState ,useEffect} from 'react';
import { FaRegComment } from "react-icons/fa";
import { BsSave2 } from "react-icons/bs";
import { MdOutlineThumbUp } from "react-icons/md";
import { likePost } from '../../api/user/get';
import { CiMenuKebab } from "react-icons/ci";

interface Post {
  _id: string;
  userId: string;
  likes: { userId: string }[];
  image: string | null;
  caption: string;
  comments: any[];
  postAt: string;
  __v: number;
}

interface PostsProps {
  posts: Post[];
  user: { _id: string };
}

const Posts: React.FC<PostsProps> = ({ posts, user }) => {
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [postsState, setPostsState] = useState<Post[]>([]);

  useEffect(() => {
    console.log('Setting postsState with posts:', posts);
    setPostsState(posts);
  }, [posts]);  // Effect runs when `posts` prop changes

  const handleLikeClick = async (postId: string) => {
    try {
      const response = await likePost(postId, user._id);
      if (response.success) {
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

  return (
    <div className="space-y-4">
    {postsState.map((post) => (
      <div key={post._id} className="relative max-w-screen-md py-6 px-4 mx-auto bg-white shadow-md rounded-xl">
        {/* User Info Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src="https://via.placeholder.com/150"
              alt="User profile"
            />
            <div className="ml-3">
              <h4 className="font-semibold text-blue-gray-900">You</h4>
              <p className="text-gray-500 text-sm">{new Date(post.postAt).toLocaleString()}</p>
            </div>
          </div>
          {/* Three-dot menu */}
          <div className="relative">
            
          <CiMenuKebab />

            {/* Menu dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-1 hidden">
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Edit
              </button>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                Delete
              </button>
            </div>
          </div>
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
                      className={post.likes.some(like => like.userId === user._id) ? 'text-blue-500' : 'text-gray-500'}
                    />
                  </button>
                  <button className="p-2 rounded-full">
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
    ))}
  </div>
  
  
  );
};

export default Posts;
