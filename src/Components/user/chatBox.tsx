import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaPaperPlane, FaEllipsisV, FaSmile } from 'react-icons/fa';
import { getMessages } from '../../api/user/get';
import { socket } from '../../Socket/socket';
interface User {
  _id: string;
  name: string;
  image: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  time: string;
}

interface Conversation {
  _id: string;
  user1: User;
  user2: User;
  createdAt: string;
  lastMessage?: string;
}

const ChatBox: React.FC<{ conversation: any | null; user: User }> = ({ conversation, user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (conversation?._id) {
          const fetchedMessages = await getMessages(conversation._id);
          console.log('messages are', fetchedMessages);
          setMessages(fetchedMessages);
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };
  
    loadMessages();
  }, [conversation?._id]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    // Handler for receiving a message
    const handleReceiveMessage = (newMsg: Message) => {
      console.log('New message received:', newMsg);
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    };
  
    // Listen for 'receiveMessage' events
    socket.on('receiveMessage', handleReceiveMessage);
  
    // Clean up the event listener on component unmount
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);
  

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeUser = conversation
    ? conversation.user1._id === user._id
      ? conversation.user2
      : conversation.user1
    : null;
  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && conversation) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');

      socket.emit('sendMessage', {
        conversationId: conversation._id,
        sendTo: conversation.user1._id === user._id ? conversation.user2._id : conversation.user1._id,
        sendBy: user._id,
        content: newMessage,
      }, (error: any) => {
        if (error) {
          console.error('Error sending message:', error);
        }
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {conversation ? (
        <>
          <div className="p-4 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                <img
                  src={activeUser?.image || '/path/to/default-avatar.png'}
                  alt={activeUser?.name || 'User'}
                  className="w-10 h-10 rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-800">{activeUser?.name}</h2>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <FaEllipsisV />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={`${message.sender}-${message.id}`}
                className={`flex ${message.sender === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sender === 'You'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 text-gray-400">{message.time}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
              <button className="text-gray-500 hover:text-gray-700 mr-2">
                <FaSmile className="w-6 h-6" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-transparent outline-none"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                className="ml-2 text-blue-500 hover:text-blue-600 focus:outline-none"
                onClick={handleSendMessage}
              >
                <FaPaperPlane className="w-6 h-6" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
          <FaUser className="w-20 h-20 text-gray-300 mb-4" />
          <p className="text-xl text-gray-500">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
