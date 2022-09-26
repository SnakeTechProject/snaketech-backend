import { PrismaClient } from '@prisma/client';
import { roles, permissions, permission_role } from './data';

const prisma = new PrismaClient();

const main = async () => {
  console.log('> Seeding database...');

  try {
    await prisma.role.createMany({
      data: roles,
      skipDuplicates: true,
    });

    await prisma.permission.createMany({
      data: permissions,
      skipDuplicates: true,
    });

    await prisma.permission_Role.createMany({
      data: permission_role,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

main();
