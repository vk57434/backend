import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ➕ Add Score
router.post("/add", protect, async (req, res) => {
  const { score } = req.body;

  const { error } = await supabase.from("scores").insert([
    {
      user_id: req.user.id,
      value: score,
    },
  ]);

  if (error) return res.status(400).json({ error });

  res.json({ message: "Score added" });
});

// 📊 Get Scores
router.get("/", protect, async (req, res) => {
  const { data, error } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error });

  res.json({ scores: data });
});

export default router;