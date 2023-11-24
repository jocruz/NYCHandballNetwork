// src\db\prismaClient.ts
// This was taken from the docs itself as a typeScript file, this is to prevent overuse of Prisma instances
// without this we'd have to redeclare the prismaClient(); and it will warn us that we are using too many resources

import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;