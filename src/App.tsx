import React, { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { MessageCircle, Clock } from 'lucide-react';
import ChatRoom from './components/ChatRoom';
import WaitingRoom from './components/WaitingRoom';

const CHAT_DURATION = 10 * 60; // 10 minutes in seconds

function App() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [inChat, setInChat] = useState(false);
  const [partner, setPartner] = useState('');
  const [timeLeft, setTimeLeft] = useState(CHAT_DURATION);

  useEffect(() => {
    const newSocket = io('http://localhost:3000'); // Replace with your server URL
    setSocket(newSocket);

    newSocket.on('chatStart', (partnerId) => {
      setInChat(true);
      setPartner(partnerId);
      setTimeLeft(CHAT_DURATION);
    });

    newSocket.on('chatEnd', () => {
      setInChat(false);
      setPartner('');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (inChat && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [inChat, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8 flex items-center">
        <MessageCircle className="mr-2" /> Chat Anónimo de 10 Minutos
      </h1>
      {inChat ? (
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-t-lg p-4 flex justify-between items-center">
            <span className="text-lg font-semibold">Chat Anónimo</span>
            <span className="flex items-center text-red-500">
              <Clock className="mr-1" /> {formatTime(timeLeft)}
            </span>
          </div>
          <ChatRoom socket={socket} partner={partner} />
        </div>
      ) : (
        <WaitingRoom socket={socket} />
      )}
    </div>
  );
}

export default App;