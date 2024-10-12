import React, { useState } from 'react';
import { FiTrash } from 'react-icons/fi'; // Import the trash icon from react-icons
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';

interface Comment {
  userId: any;
  profilePic: string;
  userName: string;
  message: string;
  time: Date;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onAddComment: (message: string) => void;
  onDeleteComment: (index: number) => void; 
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, comments, onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const mainUser = useSelector((state: RootState) => state.user.userInfo);

  if (!isOpen) return null;

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1055] bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <h3 className="text-lg font-semibold mb-4">Comments</h3>
        {/* Comments Section with Fixed Height and Scroll */}
        <div className="max-h-[300px] overflow-y-auto mb-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-4 mb-4">
                {comment.userId.image ? (
                  <img
                    className="w-12 h-12 rounded-full object-cover"
                    src={comment.userId.image}
                    alt={`${comment.userId.name.charAt(0).toUpperCase()}'s profile`}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
                    {comment.userId.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold text-xs">
                    {comment.userId._id === mainUser?._id ? 'You' : comment.userId.name}
                  </p>
                  <p className="text-black-400 ">{comment.message}</p>
                  <p className="text-gray-400 text-xs">{new Date(comment.time).toLocaleString()}</p>
                </div>
                {/* Show delete button only for the main user's comments */}
                {comment.userId._id === mainUser?._id && (
                  <button
                    className="text-gray-400 "
                    onClick={() => onDeleteComment(index)}
                  >
                    <FiTrash size={13} />
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No comments yet.</p>
          )}
        </div>

        {/* Input Section for Adding New Comment */}
        <div className="flex items-center space-x-4 mt-4">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-lg p-2"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400"
          >
            Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
