import express from "express";
import upload from "../middleware/upload.js";
import protect from "../middleware/auth.js";
import {
  uploadResume,
  saveResumeProfile,
  getResumeProfile,
} from "../controllers/resumeController.js";

const router = express.Router();

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.post("/save", protect, saveResumeProfile);
router.get("/profile", protect, getResumeProfile);

export default router;
