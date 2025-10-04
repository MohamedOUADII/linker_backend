import asyncHandler from "express-async-handler";
import Link from "../models/Link.js";

// @desc    Get all links for logged-in user
// @route   GET /api/links
// @access  Private
export const getLinks = asyncHandler(async (req, res) => {
  const links = await Link.find({ userId: req.user.id }).sort({ order: 1 });
  res.json(links);
});

// @desc    Create a new link
// @route   POST /api/links
// @access  Private
export const createLink = asyncHandler(async (req, res) => {
  const { title, url, icon, order } = req.body;

  const link = await Link.create({
    userId: req.user.id,
    title,
    url,
    icon,
    order
  });

  res.status(201).json(link);
});

// @desc    Update a link
// @route   PUT /api/links/:id
// @access  Private
export const updateLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    res.status(404);
    throw new Error("Link not found");
  }

  if (link.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  const updatedLink = await Link.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedLink);
});

// @desc    Delete a link
// @route   DELETE /api/links/:id
// @access  Private
export const deleteLink = asyncHandler(async (req, res) => {
  const link = await Link.findById(req.params.id);

  if (!link) {
    res.status(404);
    throw new Error("Link not found");
  }

  if (link.userId.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized");
  }

  await Link.findByIdAndDelete(req.params.id);
  res.json({ message: "Link removed" });
});
