import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const time = new Date().toISOString();
  res.json({
    status: "ok",
    time
  })
})

export default router;