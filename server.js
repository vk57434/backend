import 'dotenv/config';
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";

const app = express();

// ✅ 1. FIRST: CORS
app.use(cors({
  origin: "*"
}));

// ✅ 2. THEN: JSON parser
app.use(express.json());

// ✅ 3. THEN: ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/charity", charityRoutes);
app.use("/api/score", scoreRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on ${process.env.PORT}`)
);