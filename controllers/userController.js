const User = require("../models/user");

const getAllUsers = async (req, res) => {
  const users = await User.Find();
  res.status(200).json({ users });
};

const getSingleUser = async (req, res) => {
  if (!req.user) {
    return res
      .status(400)
      .json({ message: "You are not authorized to perform this function" });
  }
  const { id } = req.params;
  const user = await User.findById(id);
  req.status(200).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id);
  req.status(200).json({ user });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  req.status(200).json({ user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
