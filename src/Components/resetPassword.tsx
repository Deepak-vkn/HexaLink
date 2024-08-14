import React from 'react';

interface ResetPasswordProps {
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  handleSubmit,
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="min-w-[500px] min-h-[400px] max-w-md mx-auto bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8"> 
          <h1 className="text-2xl font-bold mb-1 text-center">Reset Password</h1>
          <p className="text-[15px] text-slate-500 text-center">
           Enter your new password below.
          </p>
        </header>
        <form id="reset-password-form" onSubmit={handleSubmit}>
          <div className="mt-4 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mt-4 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
