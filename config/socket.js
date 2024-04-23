import { Server as socketIO } from 'socket.io';
import http from 'http'; 

// Créer une instance de serveur HTTP
const server = http.createServer();

// Créer une instance de Socket.IO et l'attacher au serveur HTTP
const io = new socketIO(server, {
  cors: {
    origin: '*',
  }
});

// Écouter les connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Un client s\'est connecté');
});

// Exporter l'instance de Socket.IO
export { io };
