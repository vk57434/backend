import 'dotenv/config';
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import supabase from "./config/db.js";

const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Seed Admin User on Startup
const seedAdminUser = async () => {
  try {
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", "admin@gmail.com")
      .single();

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash("admin@123", 10);
      
      const { error } = await supabase
        .from("users")
        .insert([
          {
            name: "Admin User",
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
          }
        ]);

      if (error) {
        console.log("⚠️ Could not seed admin user:", error.message);
      } else {
        console.log("✅ Admin user seeded successfully");
      }
    } else {
      console.log("✅ Admin user already exists");
    }
  } catch (err) {
    console.log("⚠️ Seed function error:", err.message);
  }
};

seedAdminUser();

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