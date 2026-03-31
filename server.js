import 'dotenv/config';
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

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