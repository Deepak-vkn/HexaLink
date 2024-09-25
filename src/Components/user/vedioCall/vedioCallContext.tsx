import React, { createContext, useContext, useState, ReactNode } from 'react';
import VideoCallModal from './createCall';

interface VideoCallContextProps {
  startVideoCall: (to: string) => void;
  closeVideoCall: () => void;
}

const VideoCallContext = createContext<VideoCallContextProps | undefined>(undefined);

export const useVideoCall = () => {
  const context = useContext(VideoCallContext);
  if (!context) {
    throw new Error('useVideoCall must be used within a VideoCallProvider');
  }
  return context;
};

export const VideoCallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callRecipient, setCallRecipient] = useState<string | null>(null);

  const startVideoCall = (to: string) => {
    setCallRecipient(to);
    setIsCallOpen(true);
  };

  const closeVideoCall = () => {
    setIsCallOpen(false);
    setCallRecipient(null);
  };

  return (
    <VideoCallContext.Provider value={{ startVideoCall, closeVideoCall }}>
      {children}
      {isCallOpen && callRecipient && (
        <VideoCallModal
          onCall={() => {
            console.log('Starting video call with:', callRecipient);
          }}
          onCancel={closeVideoCall}
          to={callRecipient}
        />
      )}
    </VideoCallContext.Provider>
  );
};
