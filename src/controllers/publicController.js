import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Link from "../models/Link.js";

// @desc    Get public profile + links by username
// @route   GET /api/public/:username
// @access  Public
export const getPublicProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select("name username avatar bio");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const links = await Link.find({ userId: user._id, visible: true }).sort({ order: 1 });

  res.json({
    user,
    links
  });
});
