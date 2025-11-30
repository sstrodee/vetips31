import {
  createTodo,
  deleteTodo,
  getTodo,
  listTodo,
  toggleTodo,
  updateTodo,
} from "../src/services/todo.service";
import { prisma } from "../src/db/prisma";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  await prisma.todo.deleteMany();
});

describe("Todo Service", () => {
  test("create todo and list todos", async () => {
    const t = await createTodo("Test TODO");
    const all = await listTodo();

    expect(all.find((todo) => todo.id === t.id)).toBeDefined();
    expect(t).toEqual({ id: t.id, title: "Test TODO", done: false });
  })
  test("get todo by id", async () => {
    const t = await createTodo("Test TODO");
    const fetched = await getTodo(t.id);

    expect(fetched).toEqual(t);
  });
  test("update todo title", async () => {
    const t = await createTodo("Test TODO");
    const updated = await updateTodo(t.id, "Updated TODO");

    expect(updated).toEqual({ id: t.id, title: "Updated TODO", done: false });
  });
  test('update todo title', async () => {
    const t = await createTodo('Test TODO');
    const updated = await updateTodo(t.id, 'Updated TODO');

    expect(updated).not.toEqual({ id: t.id, title: 'Updated TODO 1', done: false });
  });
  test("toggle todo done status", async () => {
    const t = await createTodo("Test TODO");
    const toggled = await toggleTodo(t.id);

    expect(toggled).toEqual({ id: t.id, title: "Test TODO", done: true });
  });
  test("delete todo", async () => {
    const t = await createTodo("Test TODO");
    await deleteTodo(t.id);
    const fetched = await getTodo(t.id);

    expect(fetched).toBeNull();
  });
});