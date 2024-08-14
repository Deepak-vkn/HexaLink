import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { otpverify, resend,fetchtimer } from '../api/user/post';
import { otpverifycompany, companyresend } from '../api/company/post';
import { useLocation, useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Otp = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState<number>(0); // Time in seconds
  const [isResendEnabled, setIsResendEnabled] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve context information from location state
  const { userid: userId, isCompany } = location.state || {};

  // Fetch the OTP resend time from backend on component mount
  useEffect(() => {
    const fetchOtpTimer = async () => {
      try {
        const response = await fetchtimer(userId); // Adjust based on your API response
        if (response.success) {
          const { timeLeft } = response;
          setTimeLeft(timeLeft);
          setIsResendEnabled(timeLeft <= 0);
        } else {
          toastr.error(response.message);
        }
      } catch (error) {
        console.error('Error fetching OTP resend time:', error);
        toastr.error('An error occurred while fetching OTP resend time');
      }
    };

    fetchOtpTimer();
  }, [userId, isCompany]);

  // Handle OTP input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    if (/^\d$/.test(value) || value === '') { // Allow only digits or empty
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value.length === 1 && index < 3) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement | null;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = parseInt(otp.join(''), 10);

    try {
      let response;
      if (isCompany) {
        response = await otpverifycompany(otpValue, userId);
      } else {
        response = await otpverify(otpValue, userId);
      }

      if (response.success) {
        toastr.success('OTP Verified Successfully!');
        navigate(isCompany ? '/company' : '/');
      } else {
        toastr.error(response.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toastr.error('An error occurred during OTP verification');
    }
  };

  // Handle Resend button click
  const handleResend = async () => {
    setOtp(['', '', '', '']);
    try {
      let response;
      if (isCompany) {
        response = await companyresend(userId);
      } else {
        response = await resend(userId);
      }

      if (response.success) {
        toastr.success('OTP resent successfully!');
        setTimeLeft(120); // Reset the timer
        setIsResendEnabled(false); // Disable resend button
      } else {
        toastr.error(response.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toastr.error('An error occurred while resending OTP');
    }
  };

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isResendEnabled) {
      const timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsResendEnabled(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft, isResendEnabled]);

  // Format time left as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 120);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-1">OTP Verification</h1>
          <p className="text-[15px] text-slate-500">Enter the 4-digit verification code that was sent to your email.</p>
        </header>
        <form id="otp-form" onSubmit={handleSubmit}>
          <div className="flex items-center justify-center gap-3">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                className="w-14 h-14 text-center text-2xl font-extrabold text-gray-600 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength={1}
              />
            ))}
          </div>
          <div className="max-w-[260px] mx-auto mt-4">
            <button
              type="submit"
              className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-gray-800 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-gray-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
            >
              Verify Account
            </button>
          </div>
        </form>
        <div className="text-sm text-slate-500 mt-4">
          Didn’t receive code? 
          <button 
            onClick={handleResend} 
            className={`font-medium text-gray-800 hover:text-gray-600 ${isResendEnabled ? '' : 'cursor-not-allowed opacity-50'}`}
            disabled={!isResendEnabled}
          >
            {isResendEnabled ? 'Resend' : `Resend in ${formatTime(timeLeft)}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
