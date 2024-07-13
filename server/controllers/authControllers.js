const authControllers = {};
const User = require("../modals/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
require("dotenv").config();
const jstsecret = process.env.jwtSecret;
const generatePassword = require("generate-password");

const passwordOptions = {
  length: 12,
  numbers: true,
  symbols: true,
  uppercase: true,
  excludeSimilarCharacters: true,
};

authControllers.SignUp = async (req, res) => {
  try {
    console.log("request body", req.body)
    const { name, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    console.log("new user", newUser)
    // Save the user
    const savedUser = await newUser.save();
    res
      .status(200)
      .json({ message: "User registered successfully", user: savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Signin controller
authControllers.SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for missing fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    // Compare passwords
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const tokenPayload = {
      userId: existingUser.id,
      username: existingUser.name,
      email: existingUser.email,
      imageUrl: existingUser.imageUrl,
    };
    const token = jwt.sign(tokenPayload, jstsecret);

    // Send response
    const responsePayload = {
      username: existingUser.name,
      email: existingUser.email,
      imageUrl: existingUser.imageUrl,
    };
    res.status(200).send({ token, user: responsePayload });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};



module.exports = authControllers;
