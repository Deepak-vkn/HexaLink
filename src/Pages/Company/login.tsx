import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
// Import your company login API function here
import { loginCompany } from '../../api/company/post'; // Replace with actual API call
import LoginForm from '../../Components/login';
import { setCompanyCredentials } from '../../Store/companySlice';

const CompanyLogin = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch(); // Correct usage



  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      try {
        const response = await loginCompany(email, password);
        if (response.success) {
          toastr.success(response.message);
          dispatch(setCompanyCredentials(response.company));
          navigate('/company/home')
        } else {
          if (response.message === 'User not verified. OTP has been sent.') {
            toastr.error(response.message);
            if (response.user && response.user._id) {
              navigate('/otp', { state: { userid: response.user._id ,isCompany:true} });
              return;
            }
          } else {
            toastr.error(response.message);
          }
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
        isCompany={true} 
      />
    );
  };
  
  export default CompanyLogin;