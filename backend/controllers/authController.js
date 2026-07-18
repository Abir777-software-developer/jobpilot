import generateToken from "../utils/generateToken.js";

export const googleCallback = (req, res) => {
  const token = generateToken(req.user._id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(`${process.env.CLIENT_URL}/resume-extraction`);
};
export const markTutorialSeen = async (req, res) => {
  try {
    req.user.hasSeenTutorial = true;
    await req.user.save();
    res.status(200).json({ hasSeenTutorial: true });
  } catch (err) {
    res.status(500).json({ message: "Failed to update tutorial status" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = (req, res) => {
  res.status(200).json({ user: req.user });
};
