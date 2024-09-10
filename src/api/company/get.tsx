import axiosInstance from '../../api/axiosInstance';


export const fetchApplications = async (companyId: string): Promise<any> => {
    try {
      console.log('raeched fetchuserpost',companyId)
      const response = await axiosInstance.get('/company/fetchApplications', { params: { companyId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      alert('Failed to fetch user posts.');
      return { success: false, message: 'Failed to fetch user posts.' };
    }
  }


  export const updateApplicationStatus = async (applicationId: string, status: string): Promise<any> => {
    try {
      console.log('Reached updateApplicationStatus', applicationId, status);
      
      const response = await axiosInstance.get('/company/updateApplicationStatus', { params: { applicationId, status } });
      return response.data;
      
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status.');
      return { success: false, message: 'Failed to update application status.' };
    }
  };

  
  export const verifyToken = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get('/company/verify-token');
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 