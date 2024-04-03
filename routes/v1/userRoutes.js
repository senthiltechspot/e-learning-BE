import express from "express";
import multer from "multer";
import {
  updateUser,
  uploadProfilePicture,
  viewUser,
} from "../../controllers/userController.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

// get, update user
router.route("/:id").get(verifyToken, viewUser).put(verifyToken, updateUser);
router
  .route("/:id/uploadProfile")
  .put(upload.single("image"), uploadProfilePicture);

export default router;
