import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/run", protect, async (req, res) => {
  // get all scores
  const { data: scores, error } = await supabase
    .from("scores")
    .select("*");

  if (error) return res.status(400).json({ error });

  if (!scores.length) {
    return res.json({ message: "No participants" });
  }

  // pick random score
  const random = scores[Math.floor(Math.random() * scores.length)];

  // fetch user name separately
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("name")
    .eq("id", random.user_id)
    .single();

  if (userError) return res.status(400).json({ userError });

  res.json({
    winner: user?.name || "Unknown",
    score: random.value,
    message: "🎉 Winner selected!"
  });
});

export default router;