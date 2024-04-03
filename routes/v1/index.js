import express from "express";
import userRoute from "./userRoutes.js";
import courseRoute from "./courseRoutes.js";
import enrollCourse from "./enrollCourse.js";
import authRoutes from "./authRoutes.js"
const router = express.Router();

router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/enrollCourse", enrollCourse);
router.use("/auth", authRoutes);

export default router;
