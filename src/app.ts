import { config } from "dotenv";
import express from "express";
import healthRouter from "./routers/health.router";
import todoRouter from "./routers/todo.router";
import categoryRouter from './routers/category.router';

config();

export function buildApp() {
  const app = express();

  app.use(express.json());

  app.use("/health", healthRouter);
  app.use("/todo", todoRouter);
  app.use('/category', categoryRouter);

  // Ошибка 404
  app.use((req, res) => res.status(404).json({ message: "Not found" }));

  // Ошибка 500
  app.use((err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error!" });
  });

  return app;
}