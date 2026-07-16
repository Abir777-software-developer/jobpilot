import express from "express";
import protect from "../middleware/auth.js";
import { refreshMatches, getMatches } from "../controllers/jobController.js";

const router = express.Router();

router.post("/refresh-matches", protect, refreshMatches);
router.get("/matches", protect, getMatches);

export default router;
