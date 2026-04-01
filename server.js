import 'dotenv/config';
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"; // ✅ only one
import supabase from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Create Admin User (ONLY ONE FUNCTION)
const createAdmin = async () => {
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("email", "admin@gmail.com");

    if (!data.length) {
      const hashed = await bcrypt.hash("admin@123", 15);

      await supabase.from("users").insert([
        {
          name: "Admin",
          email: "admin@gmail.com",
          password: hashed,
          role: "admin",
        },
      ]);

      console.log("✅ Admin user created");
    } else {
      console.log("⚡ Admin already exists");
    }
  } catch (err) {
    console.log("❌ Admin seed error:", err.message);
  }
};

// ✅ Run once on server start
createAdmin();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/draw", drawRoutes);

// ✅ Start server
app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);