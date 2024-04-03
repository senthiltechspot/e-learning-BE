import express from "express";
import userRoute from "./userRoutes.js";
import courseRoute from "./courseRoutes.js";
import enrollCourse from "./enrollCourse.js";

const router = express.Router();

router.use("/user", userRoute);
router.use("/course", courseRoute);
router.use("/enrollCourse", enrollCourse);

export default router;
