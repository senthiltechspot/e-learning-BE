import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { errorHandler } from "../utils/errorHandler.js";

export const validateLoginReq = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide email and password",
    });
  }
  if (password.length < 8) {
    return errorHandler({ status: 400, message: "Password too short" }, res);
  }
  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return errorHandler({ status: 400, message: "Invalid email address" }, res);
  }
  next();
};

export const validateRegisterReq = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide name, email and password",
    });
  }
  if (password.length < 8) {
    return errorHandler({ status: 400, message: "Password too short" }, res);
  }
  if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) {
    return errorHandler({ status: 400, message: "Invalid email address" }, res);
  }
  next();
};

export const verifyToken = async (req, res, next) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("Access Denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id); // Change findById to findByPk
    if (!user) {
      return res.status(401).send("Access Denied. User not found.");
    }
    req.user = user;
    req._id = decoded.id;
    next();
  } catch (error) {
    console.error("Verify token error", error);
    return res.status(401).send("Invalid Token.");
  }
};

export const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin") {
    return res.status(401).send("Access Denied. Admin only.");
  }
  next();
};
