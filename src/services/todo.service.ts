import { prisma } from "../db/prisma";

// Интерфейс TODO
export type Todo = {
  id: number;
  title: string;
  done: boolean;
  categoryId?: number;
}

/**
 * Возвращает массив из всех TODO в БД.
 *
 * @returns {Todo[]} Список TODO.
 */
export async function listTodo() {
  const todos = await prisma.todo.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      category: true
    }
  });

  return todos.map((todo) => ({
    id: todo.id,
    title: todo.title,
    done: todo.done,
    categoryId: todo.categoryId || undefined
  }));
}

/**
 * Создает новый TODO с заданным title и добавляет его в БД.
 *
 * @param {string} title - Заголовок TODO.
 * @param {number} categoryId - ID категории (опционально).
 * @returns {Todo} Новый TODO.
 */
export async function createTodo(title: Todo['title'], categoryId?: number) {
  const todo = await prisma.todo.create({
    data: {
      title: title,
      ...(categoryId && { categoryId: categoryId })
    },
    include: {
      category: true
    }
  });

  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    categoryId: todo.categoryId || undefined
  }
}

/**
 * Переключает TODO с заданным id в противоположное состояние.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {Todo | null} TODO или null, если TODO не найден.
 */
export async function toggleTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id: id
    }
  })

  if (!found) return null;

  const todo = await prisma.todo.update({
    where: {
      id: id
    },
    data: {
      done: !found.done
    },
    include: {
      category: true
    }
  });

  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    categoryId: todo.categoryId || undefined
  }
}

/**
 * Удаляет TODO с заданным id из хранилища.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {boolean} true, если TODO был удален, false - в противном случае.
 */
export async function deleteTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!found) return null;

  await prisma.todo.delete({
    where: {
      id: id,
    },
  });

  return {
    id: found.id,
    title: found.title,
    done: found.done,
    categoryId: found.categoryId || undefined
  }
}

/**
 * Обновляет заголовок TODO с заданным id.
 *
 * @param {Todo['id']} id - ID TODO.
 * @param {Todo['title']} title - Новый заголовок TODO.
 * @param {number} categoryId - Новая категория (опционально).
 * @returns {Todo | undefined} Обновленный TODO или undefined, если TODO не найден.
 */
export async function updateTodo(id: Todo['id'], title: Todo['title'], categoryId?: number) {
  const found = await prisma.todo.findUnique({
    where: {
      id: id,
    },
  });

  if (!found) return null;

  const todo = await prisma.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      ...(categoryId !== undefined && { categoryId: categoryId })
    },
    include: {
      category: true
    }
  });

  return {
    id: todo.id,
    title: todo.title,
    done: todo.done,
    categoryId: todo.categoryId || undefined
  };
}

/**
 * Возвращает TODO с заданным id или undefined, если TODO не найден.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {Todo | undefined} TODO или undefined, если TODO не найден.
 */
export async function getTodo(id: Todo['id']) {
  const found = await prisma.todo.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true
    }
  });

  if (!found) return null;

  return {
    id: found.id,
    title: found.title,
    done: found.done,
    categoryId: found.categoryId || undefined
  }
}