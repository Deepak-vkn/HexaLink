import axiosInstance from '../../api/axiosInstance';

export const getUserPosts = async (userId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get(`/userposts/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      alert('Failed to fetch user posts.');
      return { success: false, message: 'Failed to fetch user posts.' };
    }
  };


  export const fetchJobs = async (): Promise<any> => {

    try {
      const response = await axiosInstance.get('/fetchJobs', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error in fetchJobs call:', error);
      throw new Error('Failed to fetch jobs'); 
    }
  };
  export async function fetchFollowDocument(userId: string): Promise<any> {
    try {
      const response = await axiosInstance.get(`/follow?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching follow document:', error);
      return { success: false, message: 'Failed to fetch follow data' };
    }
  }
  
  