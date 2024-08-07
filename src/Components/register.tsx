import React from 'react';
import { Link } from 'react-router-dom';

interface RegistrationFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  number: number;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  address?: string; // Optional for company registration
  setAddress?: React.Dispatch<React.SetStateAction<string>>; // Optional for company registration
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isCompany?: boolean; // Determines if it's a company registration
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  number,
  setNumber,
  password,
  setPassword,
  address,
  setAddress,
  onSubmit,
  isCompany = false,
}) => {
  return (
    <div className="py-16">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-gray-800"></div>
        <div className="w-full p-8 lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">HexaLink</h2>
          <p className="text-xl text-gray-600 text-center">{isCompany ? 'Register Your Company' : 'Register Now'}</p>
          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">Name</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">Email Address</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">Mobile No</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
              />
            </div>
            {isCompany && address && setAddress && (
              <div className="mt-4">
                <label className="block text-gray-700 text-xs font-bold mb-2">Address</label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            )}
            <div className="mt-4">
              <label className="block text-gray-700 text-xs font-bold mb-2">Password</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-1 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Register
              </button>
            </div>
          </form>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <a href="#" className="text-xs text-center text-gray-500 uppercase">or </a>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
            <div className="px-4 py-3">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                {/* SVG paths for Google Sign-In */}
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center text-gray-600 font-bold">Sign in with Google</h1>
          </a>
          <div className="mt-4 flex items-center justify-between">
            <span className="border-b w-1/5 md:w-1/4"></span>
            <Link to={isCompany ? "/company" : "/"} className="text-xs text-gray-500 uppercase">or login</Link>
            <span className="border-b w-1/5 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
