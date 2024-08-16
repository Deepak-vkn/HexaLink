import React, { FC, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose }) => {
  // State to hold input values for name and role
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  if (!isOpen) return null;

  return (
    <div
      className="fixed left-0 top-14 z-[1055] block h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalComponents"
      aria-labelledby="exampleModalComponentsLabel"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none relative w-auto opacity-100 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:my-7 min-[576px]:max-w-[500px]"
      >
        <div
          className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-4 outline-none dark:bg-surface-dark"
        >
          <div
            className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 p-4 dark:border-white/10"
          >
            <h5
              className="text-xl font-medium leading-normal text-surface dark:text-white"
              id="exampleModalComponentsLabel"
            >
              Modal title
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 focus:text-neutral-800 dark:text-neutral-400"
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
  {/* Input field for Name */}
  <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700">Name</label>
  <input
    type="text"
    className="mt-1 block w-full border-0 border-b-2 border-gray-400 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
    value={name}
    onChange={(e) => setName(e.target.value)} // Update state on input change
  />
</div>


  {/* Input field for Role */}
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Role</label>
    <input
      type="text"
       className="mt-1 block w-full border-0 border-b-2 border-gray-400 focus:border-b-2 focus:border-primary-600 focus:outline-none transition duration-200 ease-in-out"
      value={role}
      onChange={(e) => setRole(e.target.value)} // Update state on input change
    />
  </div>
</div>
<div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
  <button 
    data-modal-hide="static-modal" 
    type="button" 
    className="text-white bg-gray-800 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
   Save Change
  </button>

</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
