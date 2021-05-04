const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  body: {
    type: String,
    required: true,
    minLength: 3,
  },
  image: {
    type: String,
  },
  tags: [
    {
      type: String,
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
