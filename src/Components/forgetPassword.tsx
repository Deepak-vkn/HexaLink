import  { useState } from 'react';

interface ForgetPasswordProps {
  isCompany: boolean;
  onSubmit: (email: string) => void;
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ isCompany, onSubmit }) => {
  const [email, setEmail] = useState('');
console.log(isCompany)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1 text-center">Forgot Password</h1>
          <p className="text-[15px] text-slate-500">
            Enter your email address to receive a password reset link.
          </p>
        </header>
        <form id="email-form" onSubmit={handleSubmit}>
          <div className="mt-4 text-left">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
            <input
              className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4 text-left">
          Remember your password? <button className="font-medium text-gray-800 hover:text-gray-600">Login</button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
