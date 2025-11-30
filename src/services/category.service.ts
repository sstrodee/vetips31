import { prisma } from "../db/prisma";

// Интерфейс Category
export type HexColor = `#${string}`
export type Category = {
  id: number;
  name: string;
  color: HexColor;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Создает новую категорию с заданным именем и цветом и добавляет её в БД.
 *
 * @param {string} name - Название категории.
 * @param {HexColor} color - Цвет категории.
 * @returns {Category} Новая категория.
 */
export async function createCategory(name: string, color: HexColor = "#3b82f6"): Promise<Category> {
  const category = await prisma.category.create({
    data: {
      name: name,
      color: color
    }
  });

  return {
    id: category.id,
    name: category.name,
    color: category.color as HexColor,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
}

/**
 * Возвращает массив из всех категорий в БД.
 *
 * @returns {Category[]} Список категорий.
 */
export async function listCategory(): Promise<Category[]> {
  const categories = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    }
  });

  return categories.map(category => ({
    id: category.id,
    name: category.name,
    color: category.color as HexColor,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  }));
}

/**
 * Возвращает категорию с заданным id или undefined, если категория не найдена.
 *
 * @param {number} id - ID категории.
 * @returns {Category | undefined} Категория или undefined, если категория не найдена.
 */
export async function getCategory(id: number): Promise<Category | null> {
  const category = await prisma.category.findUnique({
    where: {
      id: id
    }
  });

  if (!category) return null;

  return {
    id: category.id,
    name: category.name,
    color: category.color as HexColor,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
}

/**
 * Обновляет название и/или цвет категории с заданным id.
 *
 * @param {number} id - ID категории.
 * @param {string} name - Новое название категории.
 * @param {HexColor} color - Новый цвет категории.
 * @returns {Category | undefined} Обновленная категория или undefined, если категория не найдена.
 */
export async function updateCategory(id: number, name: string, color?: HexColor): Promise<Category | null> {
  const found = await prisma.category.findUnique({
    where: {
      id: id
    }
  });

  if (!found) return null;

  const category = await prisma.category.update({
    where: {
      id: id
    },
    data: {
      name: name,
      ...(color && { color: color })
    }
  });

  return {
    id: category.id,
    name: category.name,
    color: category.color as HexColor,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  };
}

/**
 * Удаляет категорию с заданным id из БД.
 *
 * @param {number} id - ID категории.
 * @returns {boolean} true, если категория была удалена, false - в противном случае.
 */
export async function deleteCategory(id: number): Promise<boolean> {
  try {
    await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Возвращает все todos в категории с заданным id.
 *
 * @param {number} categoryId - ID категории.
 * @returns {Todo[]} Список todos в категории.
 */
export async function getTodosInCategory(categoryId: number) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId
    },
    include: {
      todos: true
    }
  });

  if (!category) {
    throw new Error("Category not found");
  }

  return {
    id: category.id,
    name: category.name,
    color: category.color as HexColor,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    todos: category.todos.map(todo => ({
      id: todo.id,
      title: todo.title,
      done: todo.done
    }))
  };
}