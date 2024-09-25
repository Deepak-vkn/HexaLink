import React, { useState, useRef, useEffect } from 'react';
import { initializeSocket, socket } from '../../../Socket/socket'; // Import the initializeSocket and socket
interface VideoCallModalProps {
  onCall: () => void; // Function to notify that the call has started
  onCancel: () => void; // Function to close the modal
  to: string; // ID of the user to call
}

const peer = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
});

const VideoCallModal: React.FC<VideoCallModalProps> = ({ onCall, onCancel, to }) => {
  const [isCalling, setIsCalling] = useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null); // Ref to hold local media stream

  useEffect(() => {
    console.log('call id is to ',to)
    
    // Cleanup on unmount
    return () => {
      if (isCalling) {
        endVideoCall(); // Cleanup if the modal is closed and call is active
      }
    };
  }, [isCalling]);

  const startVideoCall = async () => {
    setIsCalling(true);
    try {
      // Request access to the user's camera and microphone
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current; // Set the local video element to show the user's camera
      }

      // Add tracks to the peer connection
      localStreamRef.current.getTracks().forEach(track => peer.addTrack(track, localStreamRef.current));

      // Create and send the call offer
      const localOffer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(localOffer));
      socket.emit('outgoing:call', { fromOffer: localOffer, to }); // Send the offer to the other user

      onCall(); // Notify that the video call has started
    } catch (error) {
      console.error('Error accessing media devices:', error);
      setIsCalling(false);
    }
  };

  // Handling incoming call
  socket.on('incomming:call', async data => {
    console.log('incoming call received');
    const { from, offer } = data;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an answer and send it back
    const answerOffer = await peer.createAnswer();
    await peer.setLocalDescription(new RTCSessionDescription(answerOffer));
    socket.emit('call:accepted', { answere: answerOffer, to: from });

    // Set up the local media stream for the call
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideoRef.current!.srcObject = localStreamRef.current;

    // Add the local tracks to the peer connection
    localStreamRef.current.getTracks().forEach(track => peer.addTrack(track, localStreamRef.current));
  });

  // Handling answer from remote peer
  socket.on('incomming:answere', async data => {
    const { offer } = data;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
  });

  // Handling incoming stream from the remote peer
  peer.ontrack = async ({ streams: [stream] }) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream; // Set the remote video source
      remoteVideoRef.current.play();
    }
  };

  const endVideoCall = () => {
    setIsCalling(false);

    localStreamRef.current?.getTracks().forEach(track => track.stop());
    onCancel(); 
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Video Call</h2>
        <div className="flex justify-center mb-4">
          <video
            ref={localVideoRef}
            autoPlay
            muted // Mute the local video so the user doesn't hear themselves
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
            onClick={startVideoCall}
            disabled={isCalling} 
          >
            {isCalling ? 'Calling...' : 'Start Call'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallModal;
