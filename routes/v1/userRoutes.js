import express from "express";
import {
  loginUser,
  RefreshToken,
  registerUser,
  updateUser,
  viewUser,
} from "../../controllers/userController.js";
import {
  validateLoginReq,
  validateRegisterReq,
  verifyToken,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterReq, registerUser);
router.post("/login", validateLoginReq, loginUser);
router.get("/refresh", RefreshToken);

// get, update user
router.route("/:id").get(verifyToken, viewUser).put(verifyToken, updateUser);

export default router;
