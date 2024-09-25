import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaPaperPlane, FaEllipsisV, FaSmile, FaVideo } from 'react-icons/fa';
import { getMessages } from '../../api/user/get';
import { socket } from '../../Socket/socket';
import VideoCallModal from '../user/vedioCall/createCall'; 

interface User {
  _id: string;
  name: string;
  image: string;
}

interface Message {
  _id: string;
  content: string;
  sendBy: string;
  sendTime: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface Conversation {
  _id: string;
  user1: User;
  user2: User;
  createdAt: string;
  lastMessage?: string;
}

const ChatBox: React.FC<{ conversation: Conversation | null; user: User }> = ({ conversation, user }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null); 
  const [showVideoCallModal, setShowVideoCallModal] = useState(false); 


  useEffect(() => {
    const loadMessages = async () => {
      try {
        if (conversation?._id) {
          const fetchedMessages = await getMessages(conversation._id);
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
    const handleReceiveMessage = (newMsg: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMsg]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && conversation) {
      const newMsg: Message = {
        _id: Date.now().toString(),
        content: newMessage,
        sendBy: user._id,
        sendTime: new Date(),
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      socket.emit(
        'sendMessage',
        {
          conversationId: conversation._id,
          sendTo: conversation.user1._id === user._id ? conversation.user2._id : conversation.user1._id,
          sendBy: user._id,
          content: newMessage,
        },
        (error: any) => {
          if (error) {
            console.error('Error sending message:', error);
          }
        }
      );
    }
  };
  const chatPartnerId = conversation?.user1._id === user._id ? conversation.user2._id : conversation.user1._id;
  const handleOpenCallModal = () => {
    console.log('opern call modal')
    setShowVideoCallModal(true); // Show the modal when the video call button is clicked
  };

  const handleCloseCallModal = () => {
        console.log('close call modal')
    setShowVideoCallModal(false); // Close the modal if call is canceled
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {conversation ? (
        <>
          <div className="p-4 bg-white shadow-sm flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative">
                {conversation.user1.image ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={conversation.user1.image}
                    alt="User profile"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold text-lg">
                    {conversation.user1.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {conversation.user1._id === user._id ? conversation.user2.name : conversation.user1.name}
                </h2>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Video call button */}
              <button className="text-gray-500 hover:text-gray-700" onClick={handleOpenCallModal}>
                <FaVideo className="w-6 h-6" />
              </button>
              {/* Options menu */}
              <button className="text-gray-500 hover:text-gray-700">
                <FaEllipsisV />
              </button>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message._id} className={`flex ${message.sendBy === user._id ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg flex justify-between items-start ${
                    message.sendBy === user._id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs mt-1 text-gray-400">
                      {new Date(message.sendTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input */}
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

      {/* Video Call Modal */}
      {showVideoCallModal && (
     <VideoCallModal
     onCall={() => {
       console.log('Starting video call...');
      
     }}
     onCancel={handleCloseCallModal}
     to={chatPartnerId} 
   />
      )}
    </div>
  );
};

export default ChatBox;
