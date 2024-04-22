import { PrismaClient } from '@prisma/client'

//const prisma = new PrismaClient()
const globalForPrisma = global;
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query']
  });
const getPrismaInstance = () => {
  return prisma;
};

const closePrismaInstance = async () => {
  if (prisma) {
    await prisma.$disconnect();
    globalForPrisma.prisma = null;
  }
};

export { getPrismaInstance, closePrismaInstance };