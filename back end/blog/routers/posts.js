const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");
const postValidation = require("../helper/postValidation");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const router = express.Router();

const upload = new multer();
router.post(
  ["/"],
  authenticateToken,
  upload.single("file"),
  (req, res, next) => {
    const { error } = postValidation.postValidation(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    } else {
      next();
    }
  }
);

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

router.post("/", async (req, res) => {
  try {
    let user = await User.find({ email: req.payload.email });

    if (!user) {
      return res.status(400).send({ error: "some thing went wrong" });
    }

    const {
      file,
      body: { title, body },
    } = req;

    let filename = "default_post.jpg";

    if (file) {
      if (
        file.detectedFileExtension == ".jpg" ||
        file.detectedFileExtension == ".png"
      ) {
        filename =
          title + Math.floor(Math.random() * 1000) + file.detectedFileExtension;

        await pipeline(
          file.stream,
          fs.createWriteStream(
            `${__dirname}/../../../front end/blog/public/images/posts/${filename}`
          )
        );
      } else {
        return res.status(500).send({ error: "invalid file type" });
      }
    }

    let post = new Post({
      userid: mongoose.Types.ObjectId(user[0]._id),
      title: req.body.title,
      body: req.body.body,
      image: filename,
      tags: req.body.tags || null,
    });

    post = await post.save();

    if (post) {
      res.status(200).json({ massage: "post is added succefully" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "some thing went wrong" });
  }
});

router.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    let deletedpost = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json({ massage: "post is deleted succefully" });
  } catch (err) {
    console.log(err);
    res.status(400).send({ error: "some thing went wrong" });
  }
});

router.patch("/:id", authenticateToken, async (req, res, next) => {
  try {
    let post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags || null,
      updatedAt: new Date(),
    });
    res.status(200).json({ stutus: "post is edited succefully" });
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
