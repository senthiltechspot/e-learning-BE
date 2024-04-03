import Sequelize from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("user", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensure the email field matches the format of an email address
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, // Disable Sequelize's automatic timestamp fields
});

export default User;
