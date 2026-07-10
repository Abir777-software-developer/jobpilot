import express from "express";
import passport from "passport";
import {
  googleCallback,
  logout,
  getMe,
} from "../controllers/authController.js";
import protect from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  googleCallback,
);

router.post("/logout", logout);
router.get("/me", protect, getMe);

export default router;
