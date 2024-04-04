import { PrismaClient } from '@prisma/client'

//const prisma = new PrismaClient()
const globalForPrisma = global;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  });

export default prisma;