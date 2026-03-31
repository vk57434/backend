import supabase from "../config/db.js";
import { generateDraw } from "../utils/draw.js";

export const runDraw = async (req, res) => {
  const numbers = generateDraw();

  await supabase.from("draws").insert([{ numbers }]);

  res.json({ message: "Draw executed", numbers });
};