import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isCompany?: boolean; 
  isAdmin?: boolean; 
}

const LoginForm: React.FC<LoginFormProps> = ({ email, setEmail, password, setPassword, onSubmit, isCompany = false, isAdmin = false }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Image at the top */}
        <div className="w-full h-32 bg-cover bg-center" style={{backgroundImage: "url('/src/Public/hexalinklogo.png')"}}>
        </div>
        
        {/* Form content */}
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome to HexaLink
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isAdmin ? 'Admin Portal' : isCompany ? 'Company Portal' : 'Professional Network'}
          </p>
          
          <form className="mt-8 space-y-6" onSubmit={onSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                pattern="^\S+$"
                title="Email cannot contain spaces"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                title="Password must be at least 6 characters long and cannot contain spaces"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                
              </div>

              <div className="text-sm">
                <Link to={isCompany ? '/company/forgetpassword' : '/forgetpassword'} className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </button>
            </div>
          </form>

          {!isAdmin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <Link
                    to={isCompany ? "/" : "/company"}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {isCompany ? 'User Login' : 'Company Login'}
                  </Link>
                </div>
                <div>
                  <Link
                    to={isCompany ? "/company/register" : "/register"}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    {isCompany ? 'Register Company' : 'Register User'}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
    
  );
};

export default LoginForm;
