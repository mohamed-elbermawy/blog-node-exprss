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
    res.render("posts/posts", { posts: posts });
    // res.send(posts);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send("some thing wrong try later");
  }
});

router.get("/addPost", (req, res, next) => {
  res.render("posts/addPost", { post: new Post() });
});

router.post(
  "/",
  async (req, res, next) => {
    try {
      if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        let user = await User.find({
          _id: mongoose.Types.ObjectId(req.body.id),
        });
        if (user != "") {
          req.post = new Post();
          next();
          // try {
          // console.log(req.body.id);
          // let post = await Post.create({
          //   userId: req.body.id,
          //   title: req.body.title,
          //   body: req.body.body,
          //   tags: req.body.tags || null,
          // });
          // console.log(post);
          // res.send("post created");
          //   post = await post.save();
          //   res.redirect(`/posts/${post.slug}`);
          // } catch (err) {
          //   // console.log(err);
          //   // res.status(500).send("some thing wrong try later");
          //   res.render("posts/addPost", { post: post });
          // }
        } else {
          res.status(400).send("user not found");
        }
      } else {
        res.status(400).send("user not found");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("user not found");
    }
  },
  savePostAndRedirect("addPost")
);

// router.get("/:userid", async (req, res, next) => {
//   if (mongoose.Types.ObjectId.isValid(req.params.userid)) {
//     try {
//       let posts = await Post.find({ userId: req.params.userid });
//       if (posts != "") {
//         console.log(posts);
//         res.send(posts);
//       } else {
//         res.status(500).send("no posts to be display it");
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("some thing wrong try later");
//     }
//   } else {
//     res.status(400).send("user not found");
//   }
// });

router.get("/:slug", async (req, res, next) => {
  let post = await Post.findOne({ slug: req.params.slug });
  if (post == null) res.redirect("/posts");
  res.render("posts/show", { post: post });
});

router.delete("/:id", async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      let deletedpost = await Post.deleteOne({ _id: req.params.id });
      if (deletedpost.deletedCount != 0) {
        res.redirect("/posts");
        // console.log(deletedpost);
        // res.send("post deleted");
      } else {
        res.status(400).send("post doesn't exists");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("some thing wrong try later");
    }
  } else {
    res.status(400).send("post doesn't exists");
  }
});

router.patch(
  "/:id",
  async (req, res, next) => {
    console.log("zxdsd");
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      if (mongoose.Types.ObjectId.isValid(req.body.id)) {
        let user = await User.find({
          _id: mongoose.Types.ObjectId(req.body.id),
        });
        if (user != "") {
          req.post = await Post.findById(req.params.id);
          next();
          // try {
          //   let postedited = await Post.findOneAndUpdate(
          //     { _id: req.params.id },
          //     {
          //       username: req.body.username,
          //       password: req.body.password,
          //       firstname: req.body.firstname,
          //       tags: req.body.tags || null,
          //       updatedAt: Date.now(),
          //     }
          //   );
          //   if (postedited != "") {
          //     console.log(postedited);
          //     res.send("post editted");
          //   } else {
          //     res.status(400).send("user not found");
          //   }
          // } catch (err) {
          //   console.log(err);
          //   res.status(500).send("some thing wrong try later");
          // }
        } else {
          res.status(400).send("user not found");
        }
      } else {
        res.status(400).send("user not found");
      }
    } else {
      res.status(400).send("post doesn't exists");
    }
  },
  savePostAndRedirect("edit")
);

router.get("/edit/:id", async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.render("posts/edit", { post: post });
});

function savePostAndRedirect(path) {
  console.log("next");
  return async (req, res, next) => {
    let post = req.post;
    (post.userId = req.body.id),
      (post.title = req.body.title),
      (post.body = req.body.body),
      (post.tag = req.body.tags || null);
    try {
      post = await post.save();
      res.redirect(`/posts/${post.slug}`);
    } catch (error) {
      res.render(`posts/${path}`, { post: post });
    }
  };
}

module.exports = router;
