const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res.status(400).send("Please provide all fields.");
  }

  const userExists = await User.finOne({ email });
  if (userExists) {
    res.status(200).send("Email already exist");
  }

  const hashedPassword = await bcrypt.hash(password);

  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  });

  const token = await jwt.sign({ id: user._id }, "123456789", {
    expiresIn: "1h",
  });

  return res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("Please provide all fields.");
  }

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Invalid credentials");
  }
  const token = jwt.sign({ id: user._id }, "123456789", { expiresIn: "1h" });

  return res.status(200).json({ token });
};

const verifyToken = (req, res, next) => {
  let Token = req.headers["authorization"];
  console.log(token);

  if (!token) return res.status(400).json({ message: "Not Authorized" });
  token = token.split(" ")[1];

  try {
    let user = jwt.verify(token, "123456789");
    req.user = user.id;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = {
  register,
  login,
  verifyToken,
};
