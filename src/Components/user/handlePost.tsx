import React, { useState, useEffect } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (file: File | null, caption: string,postId?: string) => void;
  isEditing?: boolean;
  post?: any | null;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSave, isEditing = false, post }) => {
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | ArrayBuffer | null>(null);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    if (isEditing && post) {
      setCaption(post.caption);
      setFilePreview(post.image || null);  // Set the image preview if available
    } else {
      setCaption('');
      setFilePreview(null);
      setFile(null);
    }
  }, [isEditing, post]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSave = () => {
    if (isEditing && post) {
      onSave(null, caption, post._id);  // Send caption and postId when editing
    } else {
      onSave(file, caption);  
    }
    setFile(null);
    setFilePreview(null);
    setCaption('');
    onClose();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1055] bg-gray-900 bg-opacity-50">
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <h3 className="text-lg font-semibold mb-4">
          {isEditing ? 'Edit Post' : 'Create a Post'}
        </h3>

        {/* File Upload */}
        {!isEditing && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
            <div className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              {filePreview && typeof filePreview === 'string' && filePreview.startsWith('data:image/') ? (
               <img
               src={filePreview}
               alt="File Preview"
               className="w-full h-full object-contain rounded-lg"  // Use object-contain instead of object-cover
             />
             
              ) : (
                <div className="flex flex-col items-center justify-center p-5">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16V8m4-4v12m4-8v8m4-4v4M5 8v8m4-8v8m4-4v4m4-8v8"
                    ></path>
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                </div>
              )}
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {/* Caption */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end">
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
