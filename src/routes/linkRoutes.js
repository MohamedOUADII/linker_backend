import express from "express";
import {
  getLinks,
  createLink,
  updateLink,
  deleteLink
} from "../controllers/linkController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getLinks).post(protect, createLink);
router.route("/:id").put(protect, updateLink).delete(protect, deleteLink);

export default router;
