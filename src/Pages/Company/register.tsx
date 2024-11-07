import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { registerCompany } from '../../api/company/post'
import RegistrationForm from '../../Components/register';
import Loading  from '../../Components/loading';
const CompanyRegister = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [address, setAddress] = useState<string>(''); 
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toastr.error('Passwords do not match');
      return;
    }
    setIsLoading(true);

    try {
      const data = await registerCompany(name, number, email, password, address); 
      if (data.success) {
        const id = data.data._id;
        console.log('id is ',id)
        navigate('/otp', { state: { userid: id ,isCompany:true} });
      } else {
        toastr.error(data.message);
      }
    } catch (error) {
      toastr.error('Error registering company');
      console.error('Error registering company:', error);
    }
    finally {
      setIsLoading(false);
    }
  };
  return (
    <>
    {isLoading?(<Loading/>):(
       <RegistrationForm
       name={name}
       setName={setName}
       email={email}
       setEmail={setEmail}
       number={number}
       setNumber={setNumber}
       password={password}
       setPassword={setPassword}
       confirmPassword={confirmPassword}
       setConfirmPassword={setConfirmPassword} 
       address={address}
       setAddress={setAddress}
       onSubmit={handleRegister}
       isCompany={true}
     />
    )}</>
   
  );
};

export default CompanyRegister;




