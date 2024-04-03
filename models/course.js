import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const Course = sequelize.define(
  "course",
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    level: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    imgURL: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: true,
    }
  },
  {
    timestamps: true,
  }
);

export default Course;
