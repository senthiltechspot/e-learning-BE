import express from "express";
import userRoute from "./userRoutes.js";
import courseRoute from "./courseRoutes.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/course", courseRoute);

export default router;
