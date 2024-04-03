import express from "express";
import { loginUser, registerUser } from "../../controllers/userController.js";
import {
  validateLoginReq,
  validateRegisterReq,
} from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", validateRegisterReq, registerUser);
router.post("/login", validateLoginReq, loginUser);
export default router;
