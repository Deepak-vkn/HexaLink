import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import Navbar from '../../Components/user/navbar';
import ChatList from '../../Components/user/chatList';
import ChatBox from '../../Components/user/chatBox';
import { fetchConversations } from '../../api/user/get'; // Adjust the import as needed
const ChatPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [conversations, setConversations] = useState<any>([]);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  useEffect(() => {
    const loadConversations = async () => {
      try {
        if (user?._id) {
          const fetchedConversations = await fetchConversations(user?._id); 
          setConversations(fetchedConversations);
        }
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };

    loadConversations();
  }, [user?._id]);

  const handleConversationSelect = (conversation: any) => {
    console.log('Selected Conversation :', conversation);
    setSelectedConversation(conversation);
  };
  return (
    <div className="flex flex-col h-screen">
      <Navbar user={user} />
      <div className="flex flex-1 overflow-hidden">
      <ChatList 
    chats={conversations}  
    user={user} 
    onConversationSelect={handleConversationSelect} 
/>

        {selectedConversation && (
          <ChatBox conversation={selectedConversation} user={user}/>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
