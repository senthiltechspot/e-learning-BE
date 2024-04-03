import express from "express";
import { requestResetPassword, resetPassword } from "../../controllers/authController.js";
import { validateLoginReq, validateRegisterReq } from "../../middlewares/authMiddleware.js";
import { loginUser, RefreshToken, registerUser } from "../../controllers/userController.js";

const router = express.Router();

router.post("/register", validateRegisterReq, registerUser);
router.post("/login", validateLoginReq, loginUser);
router.get("/refresh", RefreshToken);

router.post("/resetPassword", requestResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
