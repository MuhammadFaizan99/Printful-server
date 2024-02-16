// userController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {userModel} = require("../model/userSchema");

const signUp = async (req, res) => {
  const { UserName, Email, Password, ConfirmPassword, ApiKey } = req.body;

  // Check if the password and confirm password match
  if (Password !== ConfirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new userModel({
      UserName,
      Email,
      Password: hashedPassword,
      ConfirmPassword,
      ApiKey
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: "User registration failed" });
  }
};

const signIn = async (req, res) => {
  const { Email, Password } = req.body;

  try {
    const user = await userModel.findOne({ Email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(Password, user.Password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create and return a JWT token
    const token = jwt.sign({ userId: user._id, ApiKey: user.ApiKey }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { signUp, signIn };