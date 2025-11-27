import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
  await prisma.$connect();
}

async function disconnectDB() {
  await prisma.$disconnect();
}

export { prisma, connectDB, disconnectDB };