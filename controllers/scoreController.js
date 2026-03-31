import supabase from "../config/db.js";

export const addScore = async (req, res) => {
  const { score } = req.body;
  const userId = req.user.id;

  // get existing scores
  const { data: user, error } = await supabase
    .from("users")
    .select("scores")
    .eq("id", userId)
    .single();

  if (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  let scores = user?.scores || [];

  // keep only last 5
  if (scores.length >= 5) {
    scores.shift(); // remove oldest
  }

  scores.push({
    value: score,
    date: new Date(),
  });

  // update DB
  const { error: updateError } = await supabase
    .from("users")
    .update({ scores })
    .eq("id", userId);

  if (updateError) {
    console.log(updateError);
    return res.status(400).json({ error: updateError });
  }

  res.json({ message: "Score added", scores });
};