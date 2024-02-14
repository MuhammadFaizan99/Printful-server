// userSchema.js
const mysql = require("mysql");
const {dbConnect} = require("../connection");

// Create a MySQL connection
const connection = dbConnect();

// Create the User table schema
const createUserTable = () => {
    const createUserTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      UserName VARCHAR(255) NOT NULL,
      Email VARCHAR(255) NOT NULL,
      Password VARCHAR(255) NOT NULL,
      ConfirmPassword VARCHAR(255) NOT NULL,  -- Include ConfirmPassword in the schema
      ApiKey VARCHAR(255)
    )
  `;
  
  connection.query(createUserTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating user table:", err);
    } else {
      console.log("User table created successfully");
    }
  });
};

module.exports = { createUserTable };