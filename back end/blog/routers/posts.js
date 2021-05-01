const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");
const postValidation = require("../helper/postValidation");

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

router.get("/", async (req, res, next) => {
  try {
    let posts = await Post.find({}).sort({ createdAt: "desc" });
    console.log(posts);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send({ error: "some thing wrong try later" });
  }
});

router.post("/", async (req, res) => {
  try {
    let post = new Post({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags || null,
    });
    post = await post.save();
    // res.json({ stutus: "post is added succefully" });
    res.redirect("http://localhost:3000/posts");
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

module.exports = router;