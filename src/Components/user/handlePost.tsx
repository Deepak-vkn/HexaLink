import React, { useState, useEffect } from 'react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (files: File[] | null, caption: string, postId?: string) => void;
  isEditing?: boolean;
  post?: any | null;
}


const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onSave, isEditing = false, post }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [caption, setCaption] = useState('');
  const MAX_FILES = 4; 

  useEffect(() => {
    if (isEditing && post) {
      setCaption(post.caption);
      setFilePreviews(post.images || []); 
    } else {
      setCaption('');
      setFilePreviews([]);
      setFiles([]);
    }
  }, [isEditing, post]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length + files.length > MAX_FILES) {
      alert(`You can upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    setFiles([...files, ...selectedFiles]);
    
    // const newPreviews = selectedFiles.map((file) => {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onloadend = () => {
    //     setFilePreviews((prev) => [...prev, reader.result as string]);
    //   };
    //   return reader.result as string;
    // });
  };

  const handleSave = () => {
    if (isEditing && post) {
      onSave(null, caption, post._id); 
    } else {
      onSave(files, caption);  
    }
    setFiles([]);
    setFilePreviews([]);
    setCaption('');
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Files</label>
            <div className="relative flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              {filePreviews.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {filePreviews.map((preview, index) => (
                    <img
                      key={index}
                      src={preview}
                      alt={`File Preview ${index}`}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                  ))}
                </div>
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
                multiple
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
            {files.length > MAX_FILES && (
              <p className="text-sm text-red-500 mt-2">
                You can upload a maximum of {MAX_FILES} files.
              </p>
            )}
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
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-500 focus:outline-none"
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
