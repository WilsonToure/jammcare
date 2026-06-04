import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import prescRoutes from './routes/prescriptions';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: '*' } });

// basic socket handlers for notifications and signaling
io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', (room) => {
    socket.join(room);
  });
  socket.on('signal', (payload) => {
    // payload: { to, from, data }
    io.to(payload.to).emit('signal', { from: payload.from, data: payload.data });
  });
  socket.on('notify', async (payload) => {
    // create notification in DB and emit to user room
    const note = await prisma.notifications.create({ data: { user_id: payload.user_id, title: payload.title, body: payload.body, link: payload.link } });
    io.to(`user-${payload.user_id}`).emit('notification', note);
  });
});

// routes
app.use('/api/auth', authRoutes);
app.use('/api/prescriptions', prescRoutes);

app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/api/facilities', async (req, res) => {
  const q = await prisma.health_facilities.findMany({ take: 200 });
  res.json(q);
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
server.listen(PORT, async () => {
  console.log(`API + socket listening on ${PORT}`);
  try { await prisma.$connect(); console.log('Prisma connected'); } catch(e){ console.error(e); }
});
