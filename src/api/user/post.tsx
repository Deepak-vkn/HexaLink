// src/api/user.ts

import axiosInstance from '../../api/axiosInstance';

export const registerUser = async (name: string, number: number, email: string, password: string) => {
  try {
    console.log('raeched fron end post')
    console.log( name,
      number,
      email,
      password)
      const response = await axiosInstance.post('/register', {
        name,
        number,
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};



export const otpverify=async(otpValue:number,userId:number)=>{

  try {
    console.log('Reached frontend for OTP verification');
    console.log('OTP:', otpValue,userId);
    
    const response = await axiosInstance.post('/verifyotp', {
      otp: otpValue,
      userId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.log('resonse rechd in fron end post')
    console.error('Error verifying OTP:', error);
    throw error;
  }

}

export const loginUser=async(email:string,password:string)=>{
  try {
    const response=await axiosInstance.post('/login',{
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
    

  } catch (error) {
    console.log(error)
    throw error;
  }
}


export const resend=async(userId:string)=>{
  try {
    const response= await axiosInstance.post('/resendOtP',{
      userId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
    
  } catch (error) {
    
  }
}