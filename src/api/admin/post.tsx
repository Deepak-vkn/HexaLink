
import axiosInstance from '../../api/axiosInstance';

export const loginAdmin=async(email:string,password:string)=>{
    console.log('raeched admin log')
    try {
     
      const response=await axiosInstance.post('/admin',{
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

  export const blockUser=async(userId:string)=>{
    console.log('raeched admin log',)
    try {
     
      const response=await axiosInstance.post('/block',{
        userId
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

  export const blockCompany=async(userId:string)=>{
    console.log('raeched admin log',)
    try {
     
      const response=await axiosInstance.post('/company/block',{
        userId
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
