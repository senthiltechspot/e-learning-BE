import Course from "./course.js";
import EnrollmentData from "./enrollmentData.js";
import User from "./user.js";

const DefineAssociations = () => {
  Course.belongsToMany(User, { through: EnrollmentData });
  User.belongsToMany(Course, { through: EnrollmentData });

  User.hasMany(EnrollmentData);
  EnrollmentData.belongsTo(User);
  Course.hasMany(EnrollmentData);
  EnrollmentData.belongsTo(Course);
};

export default DefineAssociations;
