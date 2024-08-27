import { FC, useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveChanges: (data: any) => Promise<void>;
  fields: string[];
  jobDetails: any; // or more specific type if you have one
  editMode: boolean;
  viewMode:boolean;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, fields, onSaveChanges, jobDetails, editMode,viewMode }) => {
  const [title, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [packageAmount, setPackageAmount] = useState<number | ''>('');
  const [expires, setExpires] = useState<string>('');
  const [opening, setOpening] = useState<string>('');
  const [status, setStatus] = useState<string>('active');
  const [skill, setSkills] = useState<string[]>([]);
  const [experience, setExperience] = useState<string>('');
  const [level, setLevel] = useState<string>('');

  // Helper function to reset form fields
  const resetForm = () => {
    console.log('reset triggerd2')
    setJobTitle('');

    setLocation('');
    setDescription('');
    setPackageAmount('');
    setExpires('');
    setOpening('');
    setStatus('active');
    setSkills([]);
    setExperience('');
    setLevel('');
  };

  useEffect(() => {
    if (isOpen && jobDetails) {
      // Populate the form fields with the existing job details
      setJobTitle(jobDetails.title || '');

      setLocation(jobDetails.location || '');
      setDescription(jobDetails.description || '');
      setPackageAmount(jobDetails.package || '');
      setExpires(jobDetails.expires || '');
      setOpening(jobDetails.opening || '');
      setStatus(jobDetails.status || 'active');
      setSkills(jobDetails.skill || []);
      setExperience(jobDetails.experience || '');
      setLevel(jobDetails.level || '');
    } else if (!editMode) {
      resetForm();
    }
  }, [isOpen, jobDetails, editMode]);

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    onSaveChanges({
      title,
      location,
      description,
      package: packageAmount,
      expires,
      opening,
      status,
      skill,
      experience,
      level,
    }).then(() => {
      onClose();
    });
  };
  const handleClose = () => {
    console.log('reset triggerd')
    resetForm(); 
    onClose();   
  };

  return (
    <div className="fixed inset-0 z-[1055] flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl mx-4 my-8 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
          <h5 className="text-xl font-medium leading-normal text-gray-800 dark:text-white">
            {editMode ? 'Edit Job' : 'Create Job'}
          </h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </button>
        </div>
        <div className="relative flex-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fields.includes('title') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Title</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={title}
                  onChange={(e) => setJobTitle(e.target.value)}
                  disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}

            {fields.includes('location') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}

            {fields.includes('description') && (
              <div className="mb-4 col-span-1 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Job Description</label>
                <textarea
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out resize-y h-24" 
                  style={{ minHeight: '1.5rem', resize: 'vertical' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}

            {fields.includes('package') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Package</label>
                <input
                  type="number"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={packageAmount}
                  onChange={(e) => setPackageAmount(Number(e.target.value))}
                   disabled={!editMode && !viewMode}  
                />
              </div>
            )}

            {fields.includes('expires') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expires On</label>
                <input
                  type="date"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={expires}
                  onChange={(e) => setExpires(e.target.value)}
                   disabled={!editMode && !viewMode}  
                />
              </div>
            )}

            {fields.includes('opening') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Opening</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={opening}
                  onChange={(e) => setOpening(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}

            {fields.includes('status') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            )}

            {fields.includes('skill') && (
              <div className="mb-4 col-span-1 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={skill.join(', ')}
                  onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}

            {fields.includes('experience') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}
            {fields.includes('level') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Level</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                   disabled={!editMode && !viewMode}  // Disable input when not in edit mode
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="px-4 py-2 text-white bg-gray-800 hover:bg-gray-600 rounded-md"
            onClick={handleSaveChanges}
             disabled={!editMode && !viewMode}  // Disable button when not in edit mode
          >
            Save Changes
          </button>
          <button
            type="button"
            className="ml-4 px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md"
            onClick={handleClose} 
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
