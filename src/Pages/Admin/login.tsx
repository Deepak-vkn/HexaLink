import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { loginAdmin } from '../../api/admin/post'; // Replace with actual API call
import LoginForm from '../../Components/login';
import { useDispatch } from 'react-redux';
import { setAdminCredentials } from '../../Store/adminSlice';

const AdminLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Correct usage
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        const response = await loginAdmin(email, password);
        if (response.success) {
          toastr.success(response.message);
          dispatch(setAdminCredentials(response.admin))
  
          navigate('/admin/home')
        } else {
          toastr.error(response.message);
        }
      } catch (error) {
        toastr.error('Error logging in');
        console.error('Error logging in:', error);
      }
    };
  
    return (
      <LoginForm
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        onSubmit={handleSubmit}
        isAdmin={true} // For admin login
      />
    );
};

export default AdminLogin;
