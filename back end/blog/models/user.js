const { string } = require("joi");
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  lastname: {
    type: String,
    minLength: 3,
    maxLength: 15,
  },
  gender: {
    type: String,
    required: true,
  },
  following: [{ type: String }],
});

const User = mongoose.model("User", schema);

module.exports = User;
