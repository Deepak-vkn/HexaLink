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




export const logoutcall = async (role: string) => {
  console.log('Reached API');
  try {
    const response = await axiosInstance.post('/logout', { role }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in logout call:', error);
    throw error;
  }
};

export const forgetPassword = async (email: string) => {
  console.log('Reached API',email);
  try {
    const response = await axiosInstance.post('/forgetPassword', { email }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in logout call:', error);
    throw error;
  }
};

export const resetPassword = async (password: string,token:string):Promise<any> => {
  console.log('Reached API',password,token);
  try {
    const response = await axiosInstance.post('/resetPassword', { password ,token}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in logout call:', error);
    throw error;
  }
};

export const fetchtimer=async(userid:string):Promise<any>=>{
  try {
    const response = await axiosInstance.post('/fetchtimer', { userid}, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in logout call:', error);
    throw error;
  }
}



export const updateUser = async (userId:string,user: any): Promise<any> => {
  console.log('updte data ',user)
  try {
    const response = await axiosInstance.post('/update', {userId,user}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error in updateUser call:', error);
    throw error;
  }
}


export const userPost = async (formData: FormData): Promise<any> => {

  try {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
    const response = await axiosInstance.post('/userpost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data
  } catch (error) {

    console.error('Error creating post:', error);
    alert('Failed to create post.');
  }
};


export const getUserPosts = async (formData: FormData): Promise<any> => {

  try {
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
    const response = await axiosInstance.post('/userpost', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data
  } catch (error) {

    console.error('Error creating post:', error);
    alert('Failed to create post.');
  }
};
