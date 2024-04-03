import User from "../models/user.js";
import bcrpyt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/errorHandler.js";

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const HashedPassword = bcrpyt.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: HashedPassword,
    });
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
      return res
        .status(401)
        .json({ error: "Invalid credentials or No User Found" });
    }
    const isPasswordValid = await bcrpyt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: false, // set to true if using HTTPS
      })
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "none",
        secure: false,
      })
      .status(200)
      .json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          token,
          refreshToken,
        },
      });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

// view User
const viewUser = async (req, res) => {
  const { id } = req.params;
  const userId = req._id;
  if (parseInt(userId) !== parseInt(id)) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    if (id) {
      const user = await User.findOne({ where: { id } });
      res.status(200).json({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          message: "User found successfully",
        },
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

// Update User
const updateUser = async (req, res) => {
  const { id } = req.params;
  const userId = req._id;
  console.log(userId, id);
  if (userId !== id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { name, email, profilePicture } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (profilePicture) {
      user.profilePicture = profilePicture;
    }

    // save
    await user.save();

    res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        message: "User updated successfully",
      },
    });
  } catch (error) {
    console.error(error);
    errorHandler(error, res);
  }
};

const RefreshToken = async (req, res) => {
  const refreshToken = req.cookies["refreshToken"];
  if (!refreshToken) {
    return res.status(401).send("No refresh token provided.");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).send("User not found.");
    }

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newRefreshToken = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res
      .cookie("token", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        sameSite: "none",
        secure: false,
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "none",
        secure: false,
      })
      .status(200)
      .json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh token error", error);
    return res.status(401).send("Invalid refresh token.");
  }
};

export { registerUser, loginUser, viewUser, updateUser, RefreshToken };
