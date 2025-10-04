import express from "express";
import User from "../models/User.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Get current user profile
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update username or password
router.put("/me", authenticateToken, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (username) user.username = username;
    if (password) {
      const bcrypt = await import("bcryptjs");
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
