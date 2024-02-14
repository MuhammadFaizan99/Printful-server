const mysql = require("mysql");
const colors = require("colors");

// Function to create a database connection
function dbConnect() {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "printful-db",
  });

  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to the database:".red.bgRed, err.stack);
      return;
    }
    console.log("Connected to the database".green.bgGreen);
  });

  return connection;
}

module.exports = { dbConnect };