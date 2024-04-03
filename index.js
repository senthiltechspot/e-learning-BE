import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import Route from "./routes/index.js";
import sequelize from "./config/db.js"; // Import sequelize instance
import User from "./models/user.js";
import Course from "./models/course.js";
import { sampleCourses, sampleUserData } from "./utils/sampleUserData.js";
import DefineAssociations from "./models/association.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

// Sync Sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    return sequelize.sync({ force: false }); // Sync database
  })
  .then(() => {
    console.log("DB synced");
    DefineAssociations();
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes
app.get("/", (req, res) => {
  res.send("Hello Student!");
});

// accessing routes
Route(app);

// generate Users
const InitUsers = async () => {
  let adminUser = sampleUserData.admin;
  let normalUser = sampleUserData.user;
  try {
    await User.create(adminUser); // Ensure to await the creation of users
    await User.create(normalUser);
  } catch (error) {
    console.error(error);
  }
};

const AddCourses = async () => {
  let courses = sampleCourses;

  try {
    courses.forEach(async (course) => {
      await Course.create(course);
    });
  } catch (error) {
    console.error(error);
  }
};

// Call initialization functions
// InitUsers();
// AddCourses();

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, visit http://localhost:${PORT}`
  );
});
