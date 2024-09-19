const User = require("../models/user");
const bcrypt = require("bcrypt");
const CustomError = require("../errors/CustomError");

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password)
    throw new CustomError("Please provide name, email and password", 400);
  try {
    const user = await User.create(req.body);
    const token = user.createToken();
    res.status(201).json({ user: { name: user.name }, token });
  } catch (error) {
    throw new CustomError("Please provide different email", 400);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new CustomError("Please provide email and password", 400);

  try {
    const user = await User.findOne({ email: email });
    const token = user.createToken();

    if (!(await user.comparePwd(password)))
      return res.status(400).json({ msg: "Invalid password" });

    res.status(200).json({ user: { name: user.name }, token });
  } catch (error) {
    throw new CustomError("No user found", 400);
  }
};

module.exports = { register, login };
