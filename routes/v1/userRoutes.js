import express from "express";
import multer from "multer";
import {
  loginUser,
  RefreshToken,
  registerUser,
  updateUser,
  uploadProfilePicture,
  viewUser,
} from "../../controllers/userController.js";
import {
  validateLoginReq,
  validateRegisterReq,
  verifyToken,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage: storage });

router.post("/register", validateRegisterReq, registerUser);
router.post("/login", validateLoginReq, loginUser);
router.get("/refresh", RefreshToken);

// get, update user
router.route("/:id").get(verifyToken, viewUser).put(verifyToken, updateUser);
router
  .route("/:id/uploadProfile")
  .put(upload.single("image"), uploadProfilePicture);

export default router;
