import express from "express";
import { requestResetPassword, resetPassword } from "../../controllers/authController.js";

const router = express.Router();

router.post("/resetPassword", requestResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
