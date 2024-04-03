import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import Route from "./routes/index.js";
import sequelize from "./config/db.js";
import morgan from "morgan";
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Sync Sequelize
sequelize.sync({ force: false }).then(() => {
  console.log("DB synced");
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello Student!");
});

// accessing routes
Route(app);

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, visit http://localhost:${PORT}`
  );
});
