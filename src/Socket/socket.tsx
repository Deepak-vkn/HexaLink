// import { io, Socket } from 'socket.io-client';

// let socket: Socket | null = null;

// export const initializeSocket = () => {
//   if (!socket) {
//     socket = io('http://localhost:5001/', {
//       withCredentials: true,
//     });

//     // Log connection events for debugging
//     // socket.on('connect', () => {
//     //   console.log('Connected to the server:', socket?.id);
//     // });
//     // socket.on('disconnect', () => {
//     //   console.log('Disconnected from the server');
//     // });
//   }
//   return socket;
// };

import { io, Socket } from "socket.io-client";

export let socket: Socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io("http://localhost:5001");

    console.log("Socket initialized with id:", socket.id);
  }
};