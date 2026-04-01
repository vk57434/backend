import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ GET ALL USERS
router.get("/users", protect, async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name, email, created_at");

  if (error) return res.status(400).json({ error });

  res.json(data);
});

export default router;