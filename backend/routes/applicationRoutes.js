import express from "express";
import protect from "../middleware/auth.js";
import {
  createApplication,
  getApplications,
  toggleInterviewCompleted,
} from "../controllers/applicationController.js";

const router = express.Router();

router.post("/create", protect, createApplication);
router.get("/", protect, getApplications);
router.patch("/:id/toggle-complete", protect, toggleInterviewCompleted);

export default router;
