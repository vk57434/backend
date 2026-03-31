import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🎯 Run Draw
router.get("/run", protect, async (req, res) => {
  // get all scores
  const { data: scores, error } = await supabase
    .from("scores")
    .select("*");

  if (error) return res.status(400).json({ error });

  if (!scores.length) {
    return res.json({ message: "No participants" });
  }

  // random winner
  const random = scores[Math.floor(Math.random() * scores.length)];

  res.json({
    winner: random.user_id,
    score: random.value,
    message: "🎉 Winner selected!"
  });
});

export default router;