const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.send({
        success: false,
        message: "Email already exists",
      });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    return res.send({
      success: true,
      message: "User created successfully , please login",
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
}

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }
    const validPassword = await user.matchPassword(password);

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }

    // create and assign a token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.jwt_secret,
      {
        expiresIn: "1d",
      }
    );
    return res.send({
      success: true,
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    return res.send({
      success: false,
      message: error.message,
    });
  }
}

module.exports = { registerUser, loginUser };
