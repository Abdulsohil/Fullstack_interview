const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, deleted: false });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (!(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: "Invalid credentials" });
  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
  );
  res.json({ token });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  // Simulate email
  const resetLink = `http://localhost:5173/reset-password/${token}`;

  res.json({
    message: "Password reset link generated (check server console)",
    resetLink,
  });
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  const bcrypt = require("bcryptjs");
  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};
