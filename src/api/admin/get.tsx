import axiosInstance from '../../api/axiosInstance';

export const fetchUsers = async () => {
    console.log('Reached admin log');
    try {
        const response = await axiosInstance.get('/admin/fetchusers', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};


export const fetchCompany = async () => {
    console.log('Reached admin log');
    try {
        const response = await axiosInstance.get('/admin/fetchcompany', {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export const verifyToken = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get('/admin/verify-token');
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 


  export const adminDashBoard = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get('/admin/dashBoard');
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 
