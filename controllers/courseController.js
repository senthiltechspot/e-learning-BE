import Course from "../models/course.js";
import { errorHandler } from "../utils/errorHandler.js";

// Get Courses with filtering and pagination
// Example: GET /courses?page=1&limit=10&category=Programming&level=Intermediate
export const getCourses = async (req, res) => {
  try {
    // Pagination parameters
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const offset = (page - 1) * limit;

    // Filtering parameters
    const { category, level } = req.query;
    const whereClause = {};
    if (category) {
      whereClause.category = category;
    }
    if (level) {
      whereClause.level = level;
    }

    // Fetch courses based on filtering and pagination
    const courses = await Course.findAndCountAll({
      where: whereClause,
      limit: limit,
      offset: offset,
    });

    res.json({
      totalItems: courses.count,
      totalPages: Math.ceil(courses.count / limit),
      currentPage: page,
      courses: courses.rows,
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// CRUD Operations for Superadmin
export const createCourse = async (req, res) => {
  // Implement create operation
  const { title, category, level, description, imgURL, rating } = req.body;
  try {
    const course = await Course.create({
      title,
      category,
      level,
      description,
      imgURL,
      rating,
    });
    res.json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    errorHandler(error, res);
  }
};

export const getCourseById = async (req, res) => {
  // Implement read operation
  const { id } = req.params;
  try {
    const course = await Course.findByPk(id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (error) {
    console.error("Error fetching course:", error);
    errorHandler(error, res);
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, category, level, description, imgURL, rating } = req.body;

  try {
    const course = await Course.findOne({ where: { id } });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (title) course.title = title;
    if (category) course.category = category;
    if (level) course.level = level;
    if (description) course.description = description;
    if (imgURL) course.imgURL = imgURL;
    if (rating) course.rating = rating;

    await course.save();
    res.json(course);
  } catch (error) {
    console.error("Error updating course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteCourse = async (req, res) => {
  // Implement delete operation
  const { id } = req.params;
  try {
    const course = await Course.findOne({ where: { id } });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    await course.destroy();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    errorHandler(error, res);
  }
};
