import { FC, useState, useEffect } from 'react';

interface User {
  name: string;
  role?: string;
  about?: string;
  education?: string;
  skills?: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  fields: string[];
  onSaveChanges: (updatedUser: User) => void; // New prop for the callback
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, user, fields, onSaveChanges }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState('');
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role || '');
      setAbout(user.about || '');
      setEducation(user.education || '');
      setSkills(user.skills || []);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    const updatedUser = {
      name,
      role,
      about,
      education,
      skills,
    };
    onSaveChanges(updatedUser); // Call the callback function with the updated user data
    onClose();
  };

  return (
    <div className="fixed left-0 top-14 z-[1055] block h-full w-full overflow-y-auto overflow-x-hidden outline-none" aria-labelledby="exampleModalComponentsLabel" aria-hidden="true">
      <div className="pointer-events-none relative w-auto opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:my-7 min-[576px]:max-w-[500px]">
        <div className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10">
            <h5 className="text-xl font-medium leading-normal text-surface dark:text-white" id="exampleModalComponentsLabel">
              Edit Profile
            </h5>
            <button type="button" className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 focus:text-neutral-800 dark:text-neutral-400" onClick={onClose} aria-label="Close">
              <span className="[&>svg]:h-6 [&>svg]:w-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </button>
          </div>

          <div className="relative flex-auto p-4">
            {fields.includes('name') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            {fields.includes('role') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            )}

            {fields.includes('about') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">About</label>
                <textarea
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
            )}

            {fields.includes('education') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Education</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
            )}

            {fields.includes('skills') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input
                  type="text"
                  className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-b-2 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                  value={skills.join(', ')}
                  onChange={(e) => setSkills(e.target.value.split(',').map(skill => skill.trim()))}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
