const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const userValidation = require("../helper/userValidation");
const mongoose = require("mongoose");

const router = express.Router();

router.patch("/:id", (req, res, next) => {
  const { error } = userValidation.userValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}, { username: 1, firstname: 1, _id: 0 });
    console.log(users);
    res.send(users);
  } catch (err) {
    console.log(err);
    res.sendStatus(500).send("some thing wrong try later");
  }
});

router.patch("/:id", async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let user = await User.find({ username: req.body.username });
    console.log(user);

    if (user != "") {
      if (user[0]._id != req.params.id) {
        res.status(400).send("username is all ready exists");
      } else {
        try {
          let usereedited = await User.findOneAndUpdate(
            { _id: req.params.id },
            {
              username: req.body.username,
              password: req.body.password,
              firstname: req.body.firstname,
              age: req.body.age || null,
            }
          );
          if (usereedited != null) {
            console.log(usereedited);
            res.send("user editted");
          } else {
            res.status(400).send("user not found");
          }
        } catch (err) {
          console.log(err);
          res.status(500).send("some thing wrong try later");
        }
      }
    } else {
      try {
        let usereedited = await User.findOneAndUpdate(
          { _id: req.params.id },
          {
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            age: req.body.age || null,
          }
        );
        if (usereedited != null) {
          console.log(usereedited);
          res.send("user editted");
        } else {
          res.status(400).send("user not found");
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("some thing wrong try later");
      }
    }
  } else {
    res.status(400).send("user not found");
  }
});

router.delete("/:id", async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      let deleteduser = await User.deleteOne({ _id: req.params.id });
      if (deleteduser.deletedCount != 0) {
        console.log(deleteduser);
        res.send("user deleted");
      } else {
        res.status(400).send("user not found");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("some thing wrong try later");
    }
  } else {
    res.status(400).send("user not found");
  }
});

// router.post('/register', async (req, res, next) => {
//     try {
//         let user = await User.find({ username: req.body.username })
//         console.log(user)
//         if(user == ''){
//             console.log(req.body)
//             await User.create({
//                 username: req.body.username,
//                 password: req.body.password,
//                 firstname: req.body.firstname,
//                 age: req.body.age || null
//             });
//             res.send("user registerd")
//         }else{
//             res.status(400).send("username is all ready exists")
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).send("some thing wrong try later")
//     }
// })

// router.post('/login', async (req, res, next) => {
//     const { username, password } = req.body
//     try {
//         let user = await User.find({ username, password })
//         if (user != '') {
//             const userId = user[0].id
//             let posts = await Post.find({ userId })
//             if (posts == '') {
//                 posts = "no posts yet"
//             }

//             console.log(user, user[0].id, posts)
//             res.status(200).send({
//                 "message": "logged in successfully",
//                 "username": user[0].username,
//                 "latestPosts": posts
//             })
//         } else {
//             res.status(401).send({ error: "invalid credentials" })
//         }
//     } catch (err) {
//         console.log(err)
//         res.status(500).send("some thing wrong")
//     }
// })

module.exports = router;
