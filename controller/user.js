// user.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { dbConnect } = require("../connection");

const connection = dbConnect();

// user.js
const signUp = (req, res) => {
    const { UserName, Email, Password, ConfirmPassword, ApiKey } = req.body;
  
    // Check if the password and confirm password match
    if (Password !== ConfirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
  
    // Hash the password before storing it
    bcrypt.hash(Password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
  
      const addUserQuery = "INSERT INTO users (UserName, Email, Password, ConfirmPassword, ApiKey) VALUES (?, ?, ?, ?, ?)";
      connection.query(addUserQuery, [UserName, Email, hashedPassword, ConfirmPassword, ApiKey], (error, result) => {
        if (error) {
          return res.status(400).json({ message: "User registration failed" });
        }
  
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  };  

const signIn = (req, res) => {
  const { Email, Password } = req.body;

  const findUserQuery = "SELECT * FROM users WHERE Email = ?";
  connection.query(findUserQuery, [Email], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    // Compare the provided password with the hashed password
    bcrypt.compare(Password, user.Password, (err, passwordMatch) => {
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Create and return a JWT token
      const token = jwt.sign({ userId: user.id, ApiKey: user.ApiKey }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token,user });
    });
  });
};

module.exports = { signUp, signIn };