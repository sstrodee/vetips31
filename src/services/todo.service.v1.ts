// Интерфейс TODO
export type Todo = {
  id: number;
  title: string;
  done: boolean;
}

let seq = 1; // Счетчик для генерации уникальных идентификаторов
const store = new Map<Todo["id"], Todo>(); // Хранилище TODO

/**
 * Возвращает массив из всех TODO в сторе.
 *
 * @returns {Todo[]} Список TODO.
 */
export function listTodo() {
  return Array.from(store.values());
}

/**
 * Создает новый TODO с заданным title и добавляет его в хранилище.
 *
 * @param {string} title - Заголовок TODO.
 * @returns {Todo} Новый TODO.
 */
export function createTodo(title: Todo['title']) {
  const todo = { id: seq++, title, done: false };
  store.set(todo.id, todo);
  return todo;
}

/**
 * Переключает TODO с заданным id в противоположное состояние.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {Todo | undefined} TODO или undefined, если TODO не найден.
 */
export function toggleTodo(id: Todo['id']) {
  const todo = store.get(id);
  if (!todo) return;
  todo.done = !todo.done;
  return todo;
}

/**
 * Удаляет TODO с заданным id из хранилища.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {boolean} true, если TODO был удален, false - в противном случае.
 */
export function deleteTodo(id: Todo['id']) {
  const todo = store.get(id);
  store.delete(id);
  return todo;
}

/**
 * Обновляет заголовок TODO с заданным id.
 *
 * @param {Todo['id']} id - ID TODO.
 * @param {Todo['title']} title - Новый заголовок TODO.
 * @returns {Todo | undefined} Обновленный TODO или undefined, если TODO не найден.
 */
export function updateTodo(id: Todo['id'], title: Todo['title']) {
  const todo = store.get(id);
  if (!todo) return;
  todo.title = title;
  return todo;
}

/**
 * Возвращает TODO с заданным id или undefined, если TODO не найден.
 *
 * @param {Todo['id']} id - ID TODO.
 * @returns {Todo | undefined} TODO или undefined, если TODO не найден.
 */
export function getTodo(id: Todo['id']) {
  return store.get(id);
}