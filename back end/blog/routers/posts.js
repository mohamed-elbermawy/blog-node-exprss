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

router.get("/followingSays", authenticateToken, async (req, res) => {
  try {
    let user = await User.find({ email: req.payload.email });

    if (!user) {
      return res.status(400).send({ error: "some thing went wrong" });
    }

    const following = user[0].following;

    let posts = await Post.find({ userid: { $in: following } })
      .sort({ createdAt: "desc" })
      .populate({ path: "userid", select: ["_id", "firstname", "lastname"] });

    if (posts) {
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].userid._id.toString() == user[0]._id.toString()) {
          posts[i]._doc = { ...posts[i]._doc, flag: "true" };
        } else {
          if (following.includes(posts[i].userid._id.toString())) {
            posts[i]._doc = { ...posts[i]._doc, follow: "true" };
          } else {
            posts[i]._doc = { ...posts[i]._doc, follow: "false" };
          }
        }
      }
      console.log(posts);
      res.status(200).json({ posts: posts });
    } else {
      res.status(500).json({ error: "some thing wrong try later" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "some thing wrong try later" });
  }
});

router.get("/", async (req, res) => {
  try {
    const token = req.headers["authorization"];
    // console.log(req.headers);
    if (token == "null") {
      let posts = await Post.find({})
        .sort({ createdAt: "desc" })
        .populate({
          path: "userid",
          select: ["_id", "firstname", "lastname"],
        });
      console.log(posts);
      return res.status(200).json({ posts: posts });
    } else {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(401).send({ error: "invalid credentials" });
        req.payload = payload;
      });

      let user = await User.find({ email: req.payload.email });

      if (!user) {
        return res.status(400).send({ error: "some thing went wrong" });
      }

      const following = user[0].following;

      let posts = await Post.find({})
        .sort({ createdAt: "desc" })
        .populate({
          path: "userid",
          select: ["_id", "firstname", "lastname"],
        });

      if (posts) {
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].userid._id.toString() == user[0]._id.toString()) {
            posts[i]._doc = { ...posts[i]._doc, flag: "true" };
          } else {
            if (following.includes(posts[i].userid._id.toString())) {
              posts[i]._doc = { ...posts[i]._doc, follow: "true" };
            } else {
              posts[i]._doc = { ...posts[i]._doc, follow: "false" };
            }
          }
        }
        console.log(posts);
        res.status(200).json({ posts: posts });
      } else {
        res.status(500).json({ error: "some thing wrong try later" });
      }
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
      body: { title, body, tags },
    } = req;

    let filename = "default_post.jpg";

    let tags_array = [];
    if (req.body.tags) {
      tags_array_splited = req.body.tags.split(",");
      tags_array_splited.map((tag) => {
        tags_array.push(tag.trim());
      });
    }

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
      tags: tags_array,
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
    let tags_array = [];
    if (req.body.tags) {
      tags_array_splited = req.body.tags.split(",");
      tags_array_splited.map((tag) => {
        tags_array.push(tag.trim());
      });
    }
    let post = await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      tags: tags_array,
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
    }).populate({ path: "userid", select: ["_id", "firstname", "lastname"] });
    console.log(post);
    res.json(post);
  } catch (error) {
    res.json({ error: "some thing went wrrong!!" });
  }
});

router.get("/search/:key/:value", async (req, res) => {
  try {
    if (req.params.key === "tags") {
      let posts = await Post.find({
        tags: req.params.value.trim(),
      }).populate({ path: "userid", select: ["_id", "firstname", "lastname"] });
      console.log(posts);
      if (posts) {
        res.status(200).json({ posts: posts });
      } else {
        res.status(400).json({ error: "nothing!!" });
      }
    } else if (req.params.key === "title") {
      let posts = await Post.find({
        title: req.params.value.trim(),
      }).populate({ path: "userid", select: ["_id", "firstname", "lastname"] });
      console.log(posts);
      if (posts) {
        res.status(200).json({ posts: posts });
      } else {
        res.status(400).json({ error: "nothing!!" });
      }
    } else {
      res.status(400).json({ error: "some thing went wrrong!!" });
    }
  } catch (error) {
    res.status(400).json({ error: "some thing went wrrong!!" });
  }
});

// middleware to authenticate Token
function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];
  // console.log(req.headers);
  if (token == null)
    return res.status(401).send({ error: "invalid credentials" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
    if (err) return res.status(401).send({ error: "invalid credentials" });

    req.payload = payload;
    next();
  });
}

module.exports = router;

// router.get("/", authenticateToken, async (req, res) => {
//   try {
//     let user = await User.find({ email: req.payload.email });

//     if (!user) {
//       return res.status(400).send({ error: "some thing went wrong" });
//     }

//     const following = user[0].following;

//     let posts = await Post.find({})
//       .sort({ createdAt: "desc" })
//       .populate({ path: "userid", select: ["_id", "firstname", "lastname"] });

//     if (posts) {
//       for (let i = 0; i < posts.length; i++) {
//         if (posts[i].userid._id.toString() == user[0]._id.toString()) {
//           posts[i]._doc = { ...posts[i]._doc, flag: "true" };
//         } else {
//           if (following.includes(posts[i].userid._id.toString())) {
//             posts[i]._doc = { ...posts[i]._doc, follow: "true" };
//           } else {
//             posts[i]._doc = { ...posts[i]._doc, follow: "false" };
//           }
//         }
//       }
//       console.log(posts);
//       res.status(200).json({ posts: posts });
//     } else {
//       res.status(500).json({ error: "some thing wrong try later" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "some thing wrong try later" });
//   }
// });
