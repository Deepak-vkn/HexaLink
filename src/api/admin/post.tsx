
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