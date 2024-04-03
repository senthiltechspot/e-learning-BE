import express from "express";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import {
  enrollCourse,
  getEnrolledCourses,
} from "../../controllers/courseEnrollmentController.js";

const router = express.Router();

// get all enrolled Courses
router.route("/").get(verifyToken, getEnrolledCourses);

// Enroll a user in a course
router.route("/:id/enroll").put([verifyToken], enrollCourse);

export default router;
