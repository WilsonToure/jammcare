import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { authMiddleware } from '../auth';
import crypto from 'crypto';
import PDFDocument from 'pdfkit';

const prisma = new PrismaClient();
const router = express.Router();

const prescSchema = z.object({ patient_id: z.number(), doctor_id: z.number(), medications: z.any(), instructions: z.string().optional() });

// Create prescription, compute signature and optionally return PDF stream
router.post('/', authMiddleware, async (req, res) => {
  try {
    const data = prescSchema.parse(req.body);
    const issued_at = new Date();
    // create DB record without signature first
    const p = await prisma.prescriptions.create({ data: {
      patient_id: data.patient_id,
      doctor_id: data.doctor_id,
      medications: data.medications,
      instructions: data.instructions || null,
      issued_at
    }});
    // compute signature sha256(id|doctor_id|patient_id|issued_at)
    const toSign = `${p.id}|${p.doctor_id}|${p.patient_id}|${issued_at.toISOString()}`;
    const signature = crypto.createHash('sha256').update(toSign).digest('hex').slice(0,32);
    await prisma.prescriptions.update({ where: { id: p.id }, data: { signature } });

    // If client asks for pdf, generate pdf and stream
    if (req.query.pdf === '1'){
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=prescription-${p.id}.pdf`);
      doc.text('JammCare Rural', { align: 'center' });
      doc.moveDown();
      doc.text(`Prescription ID: ${p.id}`);
      doc.text(`Médecin: ${p.doctor_id}`);
      doc.text(`Patient: ${p.patient_id}`);
      doc.moveDown();
      doc.text('Médicaments:');
      doc.text(JSON.stringify(p.medications, null, 2));
      doc.moveDown();
      doc.text(`Instructions: ${p.instructions || ''}`);
      doc.moveDown();
      doc.text(`Signature: ${signature}`);
      doc.end();
      doc.pipe(res);
      return;
    }

    // emit notification to patient (application-level): create notification record
    await prisma.notifications.create({ data: { user_id: data.patient_id, title: 'Nouvelle ordonnance', body: 'Une ordonnance a été émise.', link: `/prescriptions/${p.id}` } });

    res.status(201).json({ id: p.id, signature });
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

export default router;
