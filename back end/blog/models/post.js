const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  // userId: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 20,
  },
  body: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  tags: [
    {
      type: String,
      maxLength: 10,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", schema);

module.exports = Post;
