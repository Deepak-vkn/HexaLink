import { FC, useState, useEffect } from 'react';

interface Education {
  degree?: string;
  institution?: string;
  year?: number;
}

interface User {
  name: string;
  role?: string;
  about?: string;
  education?: Education;
  skills?: string[];
  image?: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  fields: string[];
  onSaveChanges: (updatedUser: User) => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, user, fields, onSaveChanges }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [about, setAbout] = useState('');
  const [education, setEducation] = useState<Education>({});
  const [skill, setSkill] = useState<string>(''); 
  const [skills, setSkills] = useState<string[]>([]); 
  const [aboutImage, setAboutImage] = useState<string>(user?.image || '');

  useEffect(() => {
    if (user) {
      setName(user.name);
      setRole(user.role || '');
      setAbout(user.about || '');
      setEducation(user.education || {});
      setSkills(user.skills || []); 
      setAboutImage(user.image || '');
    }
  }, [user]);

  useEffect(() => {
    if (skills.length > 0) {
      handleSaveChanges();
    }
  }, [skills]); 

  if (!isOpen) return null;

  const handleSaveChanges = () => {
    const updatedUser = {
      name,
      role,
      about,
      education,
      skills, 
      image: aboutImage,
    };
    onSaveChanges(updatedUser);
    setEducation({
      degree: '',
      institution: '',
      year: undefined,
    });
    setSkills([]);
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setAboutImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSkill = () => {
    console.log('Adding skill:', skill); 
    if (skill.trim() !== '') {
      setSkills((prev) => [...prev, skill]);
      setSkill('');
    }
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
                <h2 className="text-lg font-semibold text-gray-800">Education Information</h2>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Degree</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                      placeholder="Degree"
                      value={education.degree || ''}
                      onChange={(e) => setEducation(prev => ({ ...prev, degree: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Institution</label>
                    <input
                      type="text"
                      className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                      placeholder="Institution"
                      value={education.institution || ''}
                      onChange={(e) => setEducation(prev => ({ ...prev, institution: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Year</label>
                    <input
                      type="number"
                      className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                      placeholder="Year"
                      value={education.year || ''}
                      onChange={(e) => setEducation(prev => ({ ...prev, year: Number(e.target.value) }))}
                    />
                  </div>
                </div>
              </div>
            )}

            {fields.includes('image') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                <input
                  type="file"
                  className="mt-1 block w-full"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {aboutImage && (
                  <img src={aboutImage} alt="Profile preview" className="mt-4 h-32 w-32 object-cover" />
                )}
              </div>
            )}

            {fields.includes('skills') && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Skills</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    className="mt-1 block w-full border-0 border-b-2 border-gray-300 focus:border-primary-400 focus:outline-none transition duration-200 ease-in-out"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                  />
                  
                </div>
                {skills.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {skills.map((skill, index) => (
                      <li key={index} className="text-sm text-gray-700">{skill}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-shrink-0 items-center justify-end rounded-b-md border-t-2 border-neutral-100 p-4 dark:border-white/10">
          <button
  type="button"
  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded hover:bg-gray-400"
  onClick={() => {
    if (fields.includes('skills')) {
      handleAddSkill();
    } else {
      handleSaveChanges();
    }
  }}
>
  {fields.includes('skills') ? 'Add Skill' : 'Save Changes'}
</button>
            <button
              type="button"
              className="ml-2 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded hover:bg-secondary-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
