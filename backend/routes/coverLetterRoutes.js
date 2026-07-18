import express from "express";
import protect from "../middleware/auth.js";
import { generateCoverLetter } from "../controllers/coverLetterController.js";

const router = express.Router();

router.post("/generate", protect, generateCoverLetter);

export default router;
