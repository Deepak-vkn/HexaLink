import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isCompany?: boolean; // Optional prop to determine if it's a company login
  isAdmin?: boolean; // Optional prop to determine if it's an admin login
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, onSubmit, isCompany = false, isAdmin = false }) => {
  return (
    <div><div className="py-[160px]  ">
      <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl ">
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-gray-800"></div>
        <div className="w-full p-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">HexaLink</h2>
        
          <p className="text-lg text-gray-600 text-center">
            {isAdmin ? 'Admin Login' : isCompany ? 'Company Login' : 'User Login'}
          </p>

          <form onSubmit={onSubmit}>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^\S+$"
                title="Email cannot contain spaces"
                required
              />
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                <Link to={isCompany?'/company/forgetpassword':'/forgetpassword'} className="text-xs text-gray-500">Forget Password?</Link>
              </div>
              <input
                className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              
                title="Password must be at least 6 characters long and cannot contain spaces"
                required
              />
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="bg-gray-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
              >
                Login
              </button>
            </div>
            {!isAdmin && (
              <div className="mt-4 flex items-center justify-between">
                <Link
                  to={isCompany ? "/" : "/company"}
                  className="text-xs text-gray-500 uppercase"
                >
                  {isCompany ? 'Login As User' : 'Login As Company'}
                </Link>
                <span className="border-b w-1/5 md:w-1/4"></span>
                <Link
                  to={isCompany ? "/company/register" : "/user/register"}
                  className="text-xs text-gray-500 uppercase"
                >
                  {isCompany ? 'Register Your Company' : 'Register As User'}
                </Link>
              </div>
            )}
          </form>
        </div>
      </div>
    </div></div>
    
  );
};

export default LoginForm;
