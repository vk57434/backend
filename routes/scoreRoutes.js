import express from "express";
import { addScore } from "../controllers/scoreController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addScore);

router.get("/", protect, async (req, res) => {
  const { data } = await supabase
    .from("users")
    .select("scores")
    .eq("id", req.user.id)
    .single();

  res.json({ scores: data?.scores || [] });
});

export default router;