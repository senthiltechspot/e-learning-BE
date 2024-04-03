import express from "express";
import cors from "cors";
import Route from "./routes/index.js";
import sequelize from "./config/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Sync Sequelize
sequelize.sync({ force: false }).then(() => {
  console.log("DB synced");
});
 
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// accessing routes
Route(app);

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT}, visit http://localhost:${PORT}`
  );
});
