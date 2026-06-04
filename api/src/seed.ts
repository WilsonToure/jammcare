import prismaPkg from '@prisma/client';
const { PrismaClient } = prismaPkg;
import { hashPassword } from './auth';

const prisma = new PrismaClient();

async function seed(){
  console.log('Seeding...');
  // create admin profile + user
  const adminEmail = process.env.ADMIN_EMAIL || 'elimanewilsontoure22@gmail.com';
  const adminExists = await prisma.users.findUnique({ where: { email: adminEmail } });
  if (!adminExists) {
    const profile = await prisma.profiles.create({ data: { full_name: 'Admin Owner' } });
    const password_hash = await hashPassword('adminchangeme');
    const user = await prisma.users.create({ data: { email: adminEmail, password_hash, profile: { connect: { id: profile.id } } } });
    await prisma.user_roles.create({ data: { user_id: profile.id, app_role: 'admin' } });
    console.log('Admin created:', adminEmail);
  } else {
    console.log('Admin already exists');
  }

  // seed some health facilities
  const facilitiesCount = await prisma.health_facilities.count();
  if (facilitiesCount === 0) {
    await prisma.health_facilities.createMany({ data: [
      { name: 'Hôpital Central', type: 'hopital', latitude: 14.6928, longitude: -17.4467, address: 'Dakar', phone: '+221338000000', city: 'Dakar', region: 'Dakar' },
      { name: 'Centre de Santé Yarakh', type: 'centre', latitude: 14.7357, longitude: -17.4672, address: 'Yarakh', phone: '+221338111111', city: 'Dakar', region: 'Dakar' }
    ]});
    console.log('Facilities seeded');
  }

  console.log('Seed complete');
}

seed().catch(e => { console.error(e); process.exit(1); }).finally(()=> process.exit(0));
