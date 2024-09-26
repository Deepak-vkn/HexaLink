import React, { useState, useRef, useEffect } from 'react';
import { initializeSocket, socket } from '../../../Socket/socket';

interface VideoCallModalProps {
  onCall: () => void;
  onCancel: () => void;
  to: string;
}

const peer = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
});

const VideoCallModal: React.FC<VideoCallModalProps> = ({ onCall, onCancel, to }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false); // State to track incoming call
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (isCalling) {
        endVideoCall();
      }
    };
  }, [isCalling]);

  const startVideoCall = async () => {
    setIsCalling(true);
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }

      localStreamRef.current.getTracks().forEach(track => peer.addTrack(track, localStreamRef.current));

      const localOffer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(localOffer));
      socket.emit('outgoing:call', { fromOffer: localOffer, to });

      onCall();
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setIsCalling(false);
    }
  };

  socket.on('incoming:call', async (data) => {
    console.log('Incoming call received');
    const { offer } = data;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));

    setIsIncomingCall(true); // Set incoming call state

    // Automatically accept the call
    const answerOffer = await peer.createAnswer();
    await peer.setLocalDescription(new RTCSessionDescription(answerOffer));
    socket.emit('call:accepted', { answer: answerOffer, to: data.from });

    localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    localStreamRef.current.getTracks().forEach(track => peer.addTrack(track, localStreamRef.current));
  });

  socket.on('incoming:answer', async (data) => {
    const { offer } = data;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
  });

  peer.ontrack = ({ streams: [stream] }) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    }
  };

  const endVideoCall = () => {
    // Stop and release all media tracks
    if (localStreamRef.current) {
      console.log('Stopping local media tracks...');
      localStreamRef.current.getTracks().forEach((track) => {
        track.stop(); // Stop the camera and audio tracks
        console.log(`Track ${track.kind} stopped.`);
      });
      localStreamRef.current = null; // Release the media stream reference
    } else {
      console.log('No local stream found.');
    }
  
    // Close the peer connection
    if (peer) {
      console.log('Closing peer connection...');
      peer.close();
      peer.onicecandidate = null;
      peer.ontrack = null;
    }
  
    // Reset the local and remote video elements
    if (localVideoRef.current) {
      console.log('Resetting local video...');
      localVideoRef.current.srcObject = null; // Stop the local video stream
    }
  
    if (remoteVideoRef.current) {
      console.log('Resetting remote video...');
      remoteVideoRef.current.srcObject = null; // Stop the remote video stream
    }
  
    setIsCalling(false);
    setIsIncomingCall(false); // Reset incoming call state
  
    // Reload the page after closing the call to ensure all streams are stopped
    window.location.reload();
  };
  
  
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Video Call</h2>
        <div className="flex justify-center mb-4">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-32 h-32 rounded-full border-2 border-blue-500"
          />
          <video
            ref={remoteVideoRef}
            autoPlay
            className="w-32 h-32 rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-500 text-white rounded-lg px-4 py-2"
            onClick={endVideoCall}
          >
            End Call
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
            onClick={ startVideoCall} // Disable start call during incoming call
            disabled={isCalling}
          >
            {isCalling ? 'Calling...' : isIncomingCall ? 'Accept Call' : 'Start Call'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
