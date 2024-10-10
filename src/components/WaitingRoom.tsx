import React from 'react';
import { Socket } from 'socket.io-client';
import { Loader } from 'lucide-react';

interface WaitingRoomProps {
  socket: Socket | null;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ socket }) => {
  const startMatching = () => {
    if (socket) {
      socket.emit('startMatching');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4">Sala de Espera</h2>
      <p className="mb-6">
        Haz clic en el botón para comenzar a buscar una pareja de chat aleatoria.
      </p>
      <button
        onClick={startMatching}
        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
      >
        <Loader className="animate-spin mr-2" />
        Buscar Pareja
      </button>
    </div>
  );
};

export default WaitingRoom;