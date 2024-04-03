import User from "../models/user.js";
import Course from "../models/course.js";
import { errorHandler } from "../utils/errorHandler.js";
import EnrollmentData from "../models/enrollmentData.js";

export const enrollCourse = async (req, res) => {
  const userId = req._id;
  const courseId = req.params.id;

  try {
    // Check if the user is already enrolled in the course
    const user = await User.findByPk(userId, { include: [Course] });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the course exists
    const course = await Course.findByPk(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    // check if the user is already enrolled in the course
    const enrollment = await EnrollmentData.findOne({
      where: { userId, courseId },
    });

    if (enrollment) {
      return res.status(400).json({ error: "User is already enrolled" });
    } else {
      await EnrollmentData.create({
        userId: parseInt(userId),
        courseId: parseInt(courseId),
      });
    }

    res.json({ message: "Course enrolled successfully" });
  } catch (error) {
    console.error("Error enrolling course:", error);
    errorHandler(error, res);
  }
};

// get all enrolled courses
export const getEnrolledCourses = async (req, res) => {
  const userId = req._id;
  if (!userId) {
    return res.status(401).json({ error: "UserID not found" });
  }
  try {
    const enrolledCourses = await EnrollmentData.findAll({
      where: { userId: userId },
      include: [Course], // Specify the model to include inside an array
    });
    // console.log(enrolledCourses);
    res.status(200).json(enrolledCourses);
  } catch (error) {
    console.error("Error getting enrolled courses:", error);
    errorHandler(error, res);
  }
};
