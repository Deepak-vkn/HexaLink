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
      console.log('raeched api fetch follow')
      const response = await axiosInstance.get(`/fetchFollow?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching follow document:', error);
      return { success: false, message: 'Failed to fetch follow data' };
    }
  }

  export async function fetchNotification(userId: string): Promise<any> {
    try {
      console.log('raeched api fetch notifictaion')
      const response = await axiosInstance.get(`/fetchNotification?userId=${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching follow document:', error);
      return { success: false, message: 'Failed to fetch follow data' };
    }
  }
  

  export const getUser = async (userId: string): Promise<any> => {
    try {
      console.log('raeched fetchuserpost',userId)
      const response = await axiosInstance.get('/fetchUser', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      alert('Failed to fetch user posts.');
      return { success: false, message: 'Failed to fetch user posts.' };
    }
  }; 


  export const likePost = async (postId: string,userId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/likepost', {
        params: { postId, userId } 
      });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const deletePost = async (postId: string): Promise<any> => {
    try {
 
      const response = await axiosInstance.get('/deletePost', { params: { postId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      alert('Failed to fetch user posts.');
      return { success: false, message: 'Failed to fetch user posts.' };
    }
  }; 
  export const fetchFollowingPosts = async (userId:string) => {
    try {
 
      const response = await axiosInstance.get('/fetchFollowingPosts', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error fetching user posts:', error);
      alert('Failed to fetch user posts.');
      return { success: false, message: 'Failed to fetch user posts.' };
    }
  
  };
  

  export const verifyToken = async (): Promise<any> => {
    try {
      const response = await axiosInstance.get('/verify-token');
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const followSuggestion = async (userId:string): Promise<any> => {
    try {
     
      const response = await axiosInstance.get('/followSuggestion', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 
  
  export const deletePostComments = async (postId: string, commentIndex: number) => {
    try {
      const response = await axiosInstance.delete('/deleteComment', {
        data: { postId, commentIndex },  
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;  
    }
  };
  
  export const fetchConversations = async (userId:string): Promise<any> => {
    try {
     
      const response = await axiosInstance.get('/messages', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  
  export const createConversation = async (sendObjectId:string, receiveObjectId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/createConversation', { params: { sendObjectId,receiveObjectId } });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const getMessages = async (conversationId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/getMessage', { params: { conversationId } });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 
  export const resetNotificationCount = async (userId:string): Promise<any> => {
    try {
     
      const response = await axiosInstance.get('/resetNotificationCount', { params: { userId } });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const removeAllNotifications = async (userId:string,type:string): Promise<any> => {
    console.log('clear notiftion calld in api')
    try {
      const response = await axiosInstance.get('/removeAllNotifications', { params: { userId ,type} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 
  
  export const deleteMessage = async (messageId:string): Promise<any> => {
    console.log('clear notiftion calld in api')
    try {
      const response = await axiosInstance.get('/deleteMessage', { params: { messageId} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

    
  export const unreadMessageCount = async (userId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/unReadMessage', { params: { userId} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const makeMessageRead = async (conversationId:string,userId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/makeMessageReadUseCase', { params: { conversationId,userId} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 
  export const saveItem = async (userId: string,targetId:string, type: string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/saveItems', { params: { userId,targetId,type} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const fetchSavedItems = async (userId: String,type:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/fetchsaveItems', { params: { userId,type} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const checkSaved = async (userId: string,targetId:string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/checkSaved', { params: { userId,targetId} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 

  export const fetchSinglePost = async (postId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get('/fetchSinglePost', { params: { postId} });
      return response.data;
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  }; 



  