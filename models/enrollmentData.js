import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const EnrollmentData = sequelize.define(
  "enrollmentData",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);


export default EnrollmentData;
