// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true
  },
  ConfirmPassword: {
    type: String,
    required: true
  },
  ApiKey: {
    type: String
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = {userModel};