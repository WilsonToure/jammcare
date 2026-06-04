import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

dotenv.config();
const prisma = new PrismaClient();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.get('/health', (req, res) => res.json({ ok: true }));

app.get('/facilities', async (req, res) => {
  const q = await prisma.health_facilities.findMany({ take: 200 });
  res.json(q);
});

const createAppointmentSchema = z.object({
  patient_id: z.number(),
  doctor_id: z.number(),
  scheduled_at: z.string(),
  reason: z.string().optional()
});

app.post('/appointments', async (req, res) => {
  try {
    const data = createAppointmentSchema.parse(req.body);
    const appt = await prisma.appointments.create({ data: {
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      scheduled_at: new Date(data.scheduled_at),
      reason: data.reason
    }});
    res.status(201).json(appt);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.listen(PORT, async () => {
  console.log(`API listening on ${PORT}`);
  try {
    await prisma.$connect();
    console.log('Prisma connected');
  } catch (e) {
    console.error('Prisma connect error', e);
  }
});
