import express from "express";
import { runDraw } from "../controllers/drawController.js";

const router = express.Router();

router.post("/run-draw", runDraw);

export default router;