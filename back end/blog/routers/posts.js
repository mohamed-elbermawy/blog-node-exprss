const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");
const postValidation = require("../helper/postValidation");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post(["/"], (req, res, next) => {
  const { error } = postValidation.postValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
});

router.patch(["/:id"], (req, res, next) => {
  const { error } = postValidation.postValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
});

router.get("/", async (req, res) => {
  try {
    let posts = await Post.find({}).sort({ createdAt: "desc" });
    if (posts) {
      res.status(200).json({ posts: posts });
    } else {
      res.status(500).json({ error: "some thing wrong try later" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some thing wrong try later" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    // console.log(req.body);
    // console.log(req.payload);
    let user = await User.find({ email: req.payload.email });
    // console.log(user[0]._id);
    if (!user) {
      return res.status(400).send({ error: "some thing went wrong" });
    }

    let post = new Post({
      userid: mongoose.Types.ObjectId(user[0]._id),
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags || null,
    });

    post = await post.save();

    res.status(200).json({ massage: "post is added succefully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "some thing went wrong" });
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let deletedpost = await Post.deleteOne({ _id: req.params.id });
    // res.json({ stutus: "post is deleted succefully" });
    res.redirect("http://localhost:3000/posts");
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "some thing went wrong" });
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags || null,
      updatedAt: new Date(),
    });
    // res.json({ stutus: "post is edited succefully" });
    res.redirect("http://localhost:3000/posts");
  } catch (error) {
    res.json({ error: "some thing went wrrong!!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let post = await Post.find({
      _id: mongoose.Types.ObjectId(req.params.id),
    });
    res.json(post);
  } catch (error) {
    res.json({ error: "some thing went wrrong!!" });
  }
});

// middleware to authenticate Token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  if (token == null)
    return res.status(401).send({ error: "invalid credentials" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).send({ error: "invalid credentials" });

    req.payload = payload;
    next();
  });
}

module.exports = router;
