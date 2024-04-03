import Sequelize from "sequelize";
import { dbConfig } from "./db.config.js";

const env = process.env.NODE_ENV || "development";

// Load db config
const { username, password, database, host, dialect, ENDPOINT_ID } =
  dbConfig[env];

// Create connection
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  dialectOptions: {
    options: `project=${ENDPOINT_ID}`,
    ssl: { require: true, rejectUnauthorized: false },
  },
});

// Handle connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export default sequelize;
