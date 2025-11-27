import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Очищаем существующие данные
  await prisma.todo.deleteMany();
  await prisma.category.deleteMany();

  // Создаем категории
  await prisma.category.createMany({
    data: [
      { name: 'Work', color: '#ef4444' },
      { name: 'Personal', color: '#3b82f6' },
      { name: 'Shopping', color: '#10b981' },
    ],
  });

  console.log('✅ Created categories');

  // Создаем задачи
  const workCategory = await prisma.category.findFirst({ where: { name: 'Work' } });
  const personalCategory = await prisma.category.findFirst({ where: { name: 'Personal' } });

  await prisma.todo.createMany({
    data: [
      {
        title: 'Full project proposal',
        categoryId: workCategory?.id,
      },
      {
        title: 'Buy groceries',
        categoryId: personalCategory?.id,
      },
      {
        title: 'Learn TypeScript',
      },
    ],
  });

  console.log('✅ Created todos');
  console.log('🎉 Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  