import User from "../models/user.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const HashedPassword = await bcrpyt.hashSync(password, 10);
    const user = await User.create({ name, email, password: HashedPassword });
    res.status(201).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        message: "User created successfully",
      },
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrpyt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

export { registerUser, loginUser };
