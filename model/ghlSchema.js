// userSchema.js
const mysql = require("mysql");
const {dbConnect} = require("../connection");

// Create a MySQL connection
const connection = dbConnect();

// Create the User table schema
const createGhlTable = () => {
    const createGhlTableQuery = `
    CREATE TABLE IF NOT EXISTS tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        access_token VARCHAR(255) NOT NULL,
        refresh_token VARCHAR(255) NOT NULL,
        companyId VARCHAR(255) NOT NULL,
        locationId VARCHAR(255) NOT NULL,
        userId VARCHAR(255) NOT NULL
    )
  `;
  
  connection.query(createGhlTableQuery, (err, result) => {
    if (err) {
      console.error("Error creating user table:", err);
    } else {
      console.log("GHL table created successfully");
    }
  });
};

module.exports = { createGhlTable };