import bcrypt from "bcrypt";
import crypto from 'crypto';
import { errorHandler } from "../utils/errorHandler.js";
import User from "../models/user.js";
import { ResetToken } from "../utils/htmlScript.js";
import { sendMail } from "../utils/sendMail.js";

// Request Reset Password
export const requestResetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Genereate reset token
    const resetToken = await generateResetToken();

    await User.update({ resetToken }, { where: { email } });

    const emailFormat = ResetToken(user.name, user.email, resetToken);

    await sendMail(user.email, "Reset Password", emailFormat);

    res.status(200).json({ message: "Reset token sent to email" });
  } catch (error) {
    console.log(error);
    errorHandler(error, res);
  }
};

// Function to reset password
export const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const user = await User.findOne({ where: { resetToken: token } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.update(
      { password: hashedPassword, resetToken: null },
      { where: { resetToken: token } }
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    errorHandler(error, res);
  }
};

const generateResetToken = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer.toString("hex"));
      }
    });
  });
};
