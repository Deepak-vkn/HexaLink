import React, { useEffect, useState } from 'react';
import { fetchSinglePost } from '../../api/user/get';
import { IoClose } from 'react-icons/io5';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  likePost,
  deletePost,
  deletePostComments,
  saveItem,
  fetchSavedItems,
} from '../../api/user/get';
import { updatePost, addComment } from '../../api/user/post';
import CommentModal from './commentModal';
import Loading from '../loading';
import LikeModal from './likeModal';

interface User {
  _id: string;
  name: string;
  image?: string;
}

interface Like {
  userId: User;
}

interface Comment {
  _id: string;
  userId: User;
  message: string;
  time: string;
}

interface Post {
  _id: string;
  userId: User;
  likes: Like[];
  images: string[] | null;
  caption: string;
  comments: Comment[];
  postAt: string;
  __v: number;
}

interface PostModalProps {
  postId: string;
  onClose: () => void;
  user: User;
}

const PostModal: React.FC<PostModalProps> = ({ postId, onClose, user }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const maxCaptionLength = 100;
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false);
  const [isLikeModalOpen, setIsLikeModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPostData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetchSinglePost(postId);
        if (response.success) {
          setPost(response.post);
        } else {
          setError('Failed to fetch post.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the post.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await fetchSavedItems(user._id, 'Posts');
        if (response.success) {
          setSavedItems(response.savedDoc.map((item: any) => item.originalTargetId));
        }
      } catch (error) {
        console.error('An error occurred while fetching saved posts:', error);
      }
    };

    fetchSavedPosts();
  }, [user._id]);

  const handleLikeClick = async () => {
    if (post) {
      try {
        const response = await likePost(post._id, user._id);
        if (response.success) {
          setPost(response.postDoc);
        }
      } catch (error) {
        console.error('An error occurred while liking the post:', error);
      }
    }
  };

  const handleSaveClick = async () => {
    if (post) {
      try {
        const response = await saveItem(user._id, post._id, 'Posts');
        if (response.success) {
          setSavedItems(prevItems =>
            prevItems.includes(post._id)
              ? prevItems.filter(item => item !== post._id)
              : [...prevItems, post._id]
          );
        }
      } catch (error) {
        console.error('An error occurred while saving the post:', error);
      }
    }
  };

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  if (isLoading) {
    return <Loading />; // Replace with a loading spinner component
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6">
          <p className="text-red-500 text-center">{error}</p>
          <button onClick={onClose} className="mt-4 text-blue-600">
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6 relative max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <IoClose className="h-6 w-6" />
        </button>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
          {/* User Info */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center">
              {post.userId.image ? (
                <img className="w-12 h-12 rounded-full object-cover" src={post.userId.image} alt="User profile" />
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
          </div>

          {/* Post Caption */}
          <p className="p-4 text-gray-800">
            {showMore || post.caption.length <= maxCaptionLength
              ? post.caption
              : `${post.caption.substring(0, maxCaptionLength)}...`}
            {post.caption.length > maxCaptionLength && (
              <button className="text-gray-500 ml-1 text-sm hover:underline focus:outline-none" onClick={toggleShowMore}>
                {showMore ? 'Show less' : 'Show more'}
              </button>
            )}
          </p>

          {/* Post Images */}
          {post.images && post.images.length > 0 && (
            <Slider dots={true} infinite={true} speed={500} slidesToShow={1} slidesToScroll={1}>
              {post.images.map((image: string, index: number) => (
                <div key={index} className="w-full h-80 flex items-center justify-center bg-gray-100">
                  <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-contain" />
                </div>
              ))}
            </Slider>
          )}

          {/* Like and Comment Count */}
          <div className="px-4 py-2 bg-gray-50 text-sm text-gray-500 flex justify-between">
            <span onClick={() => setIsLikeModalOpen(true)}>{post.likes.length} likes</span>
            <span>{post.comments.length} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
