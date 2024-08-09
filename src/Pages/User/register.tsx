import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { registerUser } from '../../api/user/post';
import RegistrationForm from '../../Components/register';

const UserRegister = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toastr.error('Passwords do not match');
      return;
    }

    try {
      const data = await registerUser(name, number, email, password);
      if (data.success) {
        const id = data.data._id;
        navigate('/otp', { state: { userid: id } });
      } else {
        toastr.error(data.message); // Show error using toastr
      }
    } catch (error) {
      toastr.error('Error registering user');
      console.error('Error registering user:', error);
    }
  };

  return (
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
    />
  );
};

export default UserRegister;
