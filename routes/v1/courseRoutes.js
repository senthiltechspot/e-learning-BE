import express from "express";
import {
  createCourse,
  deleteCourse,
  getCourseById,
  getCourses,
  updateCourse,
} from "../../controllers/courseController.js";
import { isAdmin, verifyToken } from "../../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCourses).post([verifyToken, isAdmin], createCourse);
// get, update Courses
router
  .route("/:id")
  .get(getCourseById)
  .put([verifyToken, isAdmin], updateCourse)
  .delete([verifyToken, isAdmin], deleteCourse);

export default router;
