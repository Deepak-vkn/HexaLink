import React from 'react';
import ForgetPassword from '../../Components/forgetPassword';
import { forgetPassword } from '../../api/user/post';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
const ForgetPasswordPage = () => {
  const handleForgetPasswordSubmit =async  (email: string) => {
    console.log('Submitting email:', email);
    const response=await forgetPassword(email)
    if(response.success){
      toastr.success(response.message);

    }
    else{
      toastr.error(response.message);
    }

   
  };

  return <ForgetPassword isCompany={false} onSubmit={handleForgetPasswordSubmit} />;
};

export default ForgetPasswordPage;
