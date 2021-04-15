const mongoose = require("mongoose");
const marked = require("marked");
const slugfiy = require("slugify");

const schema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
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
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

schema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugfiy(this.title, { lower: true, strict: true });
  }

  next();
});

const Post = mongoose.model("Post", schema);

module.exports = Post;
