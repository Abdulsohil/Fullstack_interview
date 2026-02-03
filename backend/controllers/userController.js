const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hash,
    role,
    createdBy: req.user.id,
  });
  res.json(user);
  // console.log(hash);
};

exports.getUsers = async (req, res) => {
  const users = await User.find({ deleted: false });
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(user);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { deleted: true });
  res.json({ message: "User soft deleted" });
};
