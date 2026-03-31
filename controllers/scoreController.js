import supabase from "../config/db.js";

export const addScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;

  const { data: user } = await supabase
    .from("users")
    .select("scores")
    .eq("id", userId)
    .single();

  let scores = user.scores || [];

  if (scores.length >= 5) {
    scores.shift(); // remove oldest
  }

  scores.push({
    value: score,
    date: new Date(),
  });

  await supabase
    .from("users")
    .update({ scores })
    .eq("id", userId);

  res.json({ message: "Score added", scores });
};