// src/api/user.ts

import axiosInstance from '../../api/axiosInstance';

export const registerCompany = async (name: string, number: number, email: string, password: string,address:string) => {
  try {
    console.log('reached comapny front end')
    console.log( name,
        number,
        email,
        password,
        address)

      const response = await axiosInstance.post('/company/register-company', {
        name,
        number,
        email,
        password,
        address
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

export const otpverifycompany=async(otpValue:number,userId:number)=>{

  try {
    console.log('Reached frontend for OTP verification for company');
    console.log('OTP:', otpValue,userId);
    
    const response = await axiosInstance.post('/company/verifyotp', {
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

export const loginCompany=async(email:string,password:string)=>{
  try {
    console.log('raeched company login ')
    const response=await axiosInstance.post('/company/login',{
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


export const companyresend=async(userId:string)=>{
  try {
    const response= await axiosInstance.post('/company/resendOtP',{
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


export const forgetPassword = async (email: string) => {
  console.log('Reached API',email);
  try {
    const response = await axiosInstance.post('/company/forgetPassword', { email }, {
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
    const response = await axiosInstance.post('/company/resetPassword', { password ,token}, {
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


export const saveJob = async (data: any): Promise<any> => {
  console.log('Reached API with Job Data:', data);
  try {
    const response = await axiosInstance.post('/company/createJob', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in saveJob call:', error);
    throw error;
  }
};


export const fetchJobs = async (companyId: string, sortBy: 'active' | 'inactive' | 'all'

): Promise<any> => {
  console.log('Reached fetch jobs:', companyId, 'with sort:', sortBy);
  try {
    const response = await axiosInstance.post('/company/fetchJobs', 
    { 
      companyId,
      sortBy, // Include the sortBy parameter in the request body
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in fetchJobs call:', error);
    throw error;
  }
};

export const updateJob = async (jobId: string, data: any): Promise<any> => {
  console.log('Reached API with update job Data:', data, jobId);
  try {
    const response = await axiosInstance.post(`/company/updateJob/${jobId}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error in updateJob call:', error);
    throw error;
  }
};
