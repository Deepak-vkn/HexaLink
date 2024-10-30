import React, { useState, useRef, useEffect } from 'react';
import {  socket } from '../../../Socket/socket';
import { MdCallEnd, MdCall, MdMic, MdMicOff, MdVideocam, MdVideocamOff } from 'react-icons/md';

interface VideoCallModalProps {
  onClose: () => void;
  to: string|undefined;
}

const peer = new RTCPeerConnection({
  iceServers: [{ urls: 'stun:stun.stunprotocol.org' }],
});

const VideoCallModal: React.FC<VideoCallModalProps> = ({ onClose, to }) => {
  const [isCalling, setIsCalling] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false); // State to track incoming call
  const [isMuted, setIsMuted] = useState(false); // State to track audio mute
  const [isVideoOff, setIsVideoOff] = useState(false); // State to track video mute
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {

    return () => {
      if (isCalling) {
        endVideoCall();
      }
    };
  }, [isCalling]);

  const startVideoCall = async () => {
    setIsCalling(true);
    try {
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
  
      if (localVideoRef.current && localStreamRef.current) {
        localVideoRef.current.srcObject = localStreamRef.current;
      }
  
      localStreamRef.current?.getTracks().forEach((track) => peer.addTrack(track, localStreamRef.current!));
  
      const localOffer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(localOffer));
      socket.emit('outgoing:call', { fromOffer: localOffer, to });
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
  
    const answerOffer = await peer.createAnswer();
    await peer.setLocalDescription(new RTCSessionDescription(answerOffer));
    socket.emit('call:accepted', { answer: answerOffer, to: data.from });
  
    localStreamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
  
    if (localVideoRef.current && localStreamRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    localStreamRef.current?.getTracks().forEach((track) => peer.addTrack(track, localStreamRef.current!));
  });
  
  peer.ontrack = ({ streams: [stream] }) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = stream;
      remoteVideoRef.current.play();
    }
  };
  

  socket.on('incoming:call', async (data) => {
    console.log('Incoming call received');
    const { offer } = data;
    await peer.setRemoteDescription(new RTCSessionDescription(offer));

    setIsIncomingCall(true); // Set incoming call state

    const answerOffer = await peer.createAnswer();
    await peer.setLocalDescription(new RTCSessionDescription(answerOffer));
    socket.emit('call:accepted', { answer: answerOffer, to: data.from });

    localStreamRef.current = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStreamRef.current;
    }
    localStreamRef.current?.getTracks().forEach((track) => {
      peer.addTrack(track, localStreamRef.current!);
    });
    
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

  // Toggle mute for audio track
  const toggleMute = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  // Toggle video on/off
  const toggleVideo = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff((prev) => !prev);
    }
  };

  const endVideoCall = () => {
    setIsCalling(false);
    setIsIncomingCall(false); 
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    onClose(); 
     window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-4 w-full max-w-4xl aspect-video relative">
        <video ref={remoteVideoRef} autoPlay className="w-full h-full rounded-lg object-cover" />
        <div className="absolute top-4 right-4 w-32 h-32">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className={`w-full h-full rounded-lg object-cover border-2 ${
              isVideoOff ? 'border-red-500 bg-gray-800' : 'border-blue-500'
            }`}
          />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center text-white">Video Off</div>
          )}
        </div>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
          <button
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            onClick={endVideoCall}
          >
            <MdCallEnd className="h-5 w-5" />
          </button>
          <button
            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isMuted
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
            }`}
            onClick={toggleMute}
          >
            {isMuted ? <MdMicOff className="h-5 w-5" /> : <MdMic className="h-5 w-5" />}
          </button>
          <button
            className={`p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isVideoOff
                ? 'bg-gray-300 text-gray-700 hover:bg-gray-400 focus:ring-gray-500'
                : 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500'
            }`}
            onClick={toggleVideo}
          >
            {isVideoOff ? <MdVideocamOff className="h-5 w-5" /> : <MdVideocam className="h-5 w-5" />}
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={startVideoCall}
            disabled={isCalling}
          >
            <MdCall className="h-5 w-5" />
          </button>
        </div>
        {isIncomingCall && !isCalling && (
          <div className="absolute top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-lg animate-pulse">
            Incoming Call...
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCallModal;
