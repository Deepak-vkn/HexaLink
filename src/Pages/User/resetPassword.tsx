import React, { useState } from 'react';
import ResetPassword from '../../Components/resetPassword';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../api/user/post'; 

const ResetPasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
     
    }
    if (!token) {
        alert("Token is missing. Please check your email link.");
        return;
      }
    try {
     
      const response = await resetPassword(newPassword, token);
      if(response.success){
        alert(response.message);
        navigate('/');
      }
      else{
        alert(response.message);
        navigate('/');
      }

     
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while resetting the password');
    }
  };

  return (
    <div>
      <ResetPassword
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default ResetPasswordPage;
