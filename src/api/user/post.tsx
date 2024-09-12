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

    console.log('after updteed  data ',response.data.user)
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
  console.log('form data is ',formData)
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


export const applyJob = async (formData: FormData): Promise<any> => {

  try {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    
    const response = await axiosInstance.post('/applyJob', formData, {
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

export const updateEducation = async (userId: string, index: number,field:string): Promise<any> => {
  console.log('raeched apu')
  try {
    const response = await axiosInstance.post('/updateEducation', {
      userId: userId,
      index: index,
      field:field
    });

  
    return response.data;
  } catch (error) {
 
    console.error('Error updating education:', error);

    alert('Failed to update education.');


    throw error;
  }
};


 export const sendToBackend = async (query: string) => {
  try {

    const response = await axiosInstance.post('/search', { query });
    return response.data
  } catch (error) {
    console.error("Error sending search term to backend:", error);
  }
};


export const followRequest = async (userId: string,followId: string) => {
  try {
console.log('userid is ',userId)
console.log('follow is ',followId)
    const response = await axiosInstance.post('/followUser', {userId,followId}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  } catch (error) {
    console.error("Error sending search term to backend:", error);
  }
};
export const unfollowRequest = async (userId: string,unfollowId: string) => {
  try {
    console.log('reched unfollow request')
console.log('userid is ',userId)
console.log('follow is ',unfollowId)
    const response = await axiosInstance.post('/unFollowUser', {userId,unfollowId}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  } catch (error) {
    console.error("Error sending search term to backend:", error);
  }
}
  export const updatePost = async (caption: string,postId:string) => {
    try {
      console.log('reched update post')
  
      const response = await axiosInstance.post('/updatePost', {caption,postId}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data
    } catch (error) {
      console.error("Error sending search term to backend:", error);
    }
  
};

export const addComment = async (postId: string,userId:string,comment:string) => {
  try {
    console.log('reched update post')

    const response = await axiosInstance.post('/postComment', {postId,userId,comment}, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data
  } catch (error) {
    console.error("Error sending search term to backend:", error);
  }

};



