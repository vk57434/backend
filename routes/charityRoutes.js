import express from "express";
import supabase from "../config/db.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all charities
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("charities").select("*");

  if (error) return res.status(400).json({ error });

  res.json(data);
});

// Select charity
router.post("/select", protect, async (req, res) => {
  const { charityId } = req.body;

  const { error } = await supabase
    .from("users")
    .update({ charity_id: charityId })
    .eq("id", req.user.id);

  if (error) return res.status(400).json({ error });

  res.json({ message: "Charity selected" });
});

export default router;