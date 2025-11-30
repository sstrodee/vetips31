import { Router } from "express";
import { createCategory, getCategory, getTodosInCategory, HexColor, listCategory } from "../services/category.service";

const router = Router();

// Вывод всех категорий
router.get("/", async (req, res) => {
  try {
    const categories = await listCategory();
    res.json({ list: categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Создание категории
router.post("/", async (req, res) => {
  try {
    const { title, color } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (typeof title !== "string") {
      return res.status(400).json({ message: "Title must be a string" });
    }

    if (title.trim().length === 0) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }

    if (!color) {
      return res.status(400).json({ message: "Color is required" });
    }

    if (typeof color !== "string") {
      return res.status(400).json({ message: "Color must be a string" });
    }

    if (color.trim().length === 0) {
      return res.status(400).json({ message: "Color cannot be empty" });
    }

    if (color[0] !== "#") {
      return res.status(400).json({ message: "Color must start with #" });
    }

    if (color.length !== 7) {
      return res.status(400).json({ message: "Color must be 7 characters long" });
    }

    const category = await createCategory(title.trim(), color.trim() as HexColor);
    return res.status(201).json({ category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Выборка конкретной категории
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todos } = req.query;

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: 'Id must be a number' });
    }

    const category = await getCategory(Number(id));

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    if (todos && todos === 'true') {
      const categoryWithTodos = await getTodosInCategory(category.id);
      res.json({ list: categoryWithTodos });
    } else {
      return res.json({ category });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;