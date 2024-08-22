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