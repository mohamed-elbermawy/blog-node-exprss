const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
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
  age: {
    type: String,
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
