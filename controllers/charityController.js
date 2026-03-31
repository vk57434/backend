import supabase from "../config/db.js";

export const getCharities = async (req, res) => {
  const { data } = await supabase.from("charities").select("*");
  res.json(data);
};

export const selectCharity = async (req, res) => {
  const { charityId, percentage } = req.body;

  if (percentage < 10)
    return res.status(400).json({ msg: "Minimum 10%" });

  await supabase
    .from("users")
    .update({
      charity_id: charityId,
      charity_percentage: percentage,
    })
    .eq("id", req.user.id);

  res.json({ message: "Charity selected" });
};
