import { io, Socket } from 'socket.io-client';

const URL = (import.meta.env.VITE_API_URL || 'http://localhost:4000').replace('/api','');
const socket = io(URL);

export default socket;
