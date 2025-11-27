import { buildApp } from "./app";
import { connectDB, disconnectDB } from "./db/prisma";

const port = Number(process.env.PORT ?? 3000);
const app = buildApp();

async function start() {
  await connectDB();
  app.listen(port, () => {
    console.log(`🚀 Server listening on http://localhost:${port}`);
  });
}

start().catch(async (err) => {
  console.error("Error starting server:", err);
  await disconnectDB();
  process.exit(1);
})

async function stop() {
  await disconnectDB();
  process.exit(0);
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);