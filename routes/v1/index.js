import express from "express";
import userRoute from "./userRoutes.js";

const router = express.Router();

router.use("/user", userRoute);

export default router;
