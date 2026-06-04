import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { hashPassword, verifyPassword, signJwt } from '../auth';

const prisma = new PrismaClient();
const router = express.Router();

const registerSchema = z.object({ email: z.string().email(), password: z.string().min(6), full_name: z.string().min(1) });

router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    // create profile then user
    const profile = await prisma.profiles.create({ data: { full_name: data.full_name } });
    const password_hash = await hashPassword(data.password);
    const user = await prisma.users.create({ data: { email: data.email, password_hash, profile: { connect: { id: profile.id } } }});
    // assign default role patient
    await prisma.user_roles.create({ data: { user_id: profile.id, app_role: 'patient' } });
    const token = signJwt({ userId: user.id, profileId: profile.id, email: user.email });
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

const loginSchema = z.object({ email: z.string().email(), password: z.string() });
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.users.findUnique({ where: { email: data.email }, include: { profile: true } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await verifyPassword(data.password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = signJwt({ userId: user.id, profileId: user.profile?.id, email: user.email });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

export default router;
