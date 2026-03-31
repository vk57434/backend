import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🎯 Run Draw
router.get("/run", protect, async (req, res) => {
  const { data: scores, error } = await supabase
    .from("scores")
    .select(`
      *,
      users (name)
    `);

  if (error) return res.status(400).json({ error });

  if (!scores.length) {
    return res.json({ message: "No participants" });
  }

  const random = scores[Math.floor(Math.random() * scores.length)];

  res.json({
    winner: random.users?.name || "Unknown",
    score: random.value,
    message: "🎉 Winner selected!"
  });
});

export default router;