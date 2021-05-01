const express = require("express");
const User = require("../models/user");
const Post = require("../models/post");
const userValidation = require("../helper/userValidation");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log(req.body);
  const { error } = userValidation.userValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    // res.redirect("http://localhost:3000/register");
  } else {
    next();
  }
});

router.post("/login", (req, res, next) => {
  console.log(req.body);
  const { error } = userValidation.loginValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    // res.redirect("http://localhost:3000/login");
  } else {
    next();
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.body);
    let user = new User({
      email: req.body.email,
      password: hashedPassword,
      firstname: req.body.firstName,
      lastname: req.body.lastName,
      gender: req.body.gender,
    });
    user = await user.save();
    if (user != null) {
      console.log(user);
      res.redirect("http://localhost:3000/login");
    } else {
      res.redirect("http://localhost:3000/register");
    }
    // res.send("user registerd");
  } catch (err) {
    console.log(err);
    res.redirect("http://localhost:3000/register");
    // res.status(500).send("some thing wrong try later");
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.find({ email });
    if (user != "") {
      const match = await bcrypt.compare(password, user[0].password);
      if (match) {
        console.log(user);
        // login and generate access token
        const payload = {
          email: user[0].email,
          firstname: user[0].firstname,
          lastname: user[0].lastname,
        };
        const accessToken = generateAccessToken(payload);
        console.log(accessToken);
        console.log("---------------------");
        res.json({ accessToken: accessToken });
      } else {
        res.status(401).send({ error: "invalid credentials" });
      }
    } else {
      res.status(401).send({ error: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("some thing wrong");
  }
});

router.patch("/:id", (req, res, next) => {
  const { error } = userValidation.userValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
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

// router.delete("/logout", (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
// });

// let refreshTokens = [];

// app.get("/post", authenticateToken, (req, res) => {
//   res.json(posts.filter((post) => post.email === req.user.email));
// });

// app.post("/token", (req, res) => {
//   const refreshToken = req.body.token;
//   console.log(refreshToken);
//   if (refreshToken == null) return res.sendStatus(401);
//   if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     const accessToken = generateAccessToken({ email: user.email });
//     res.json({ accessToken: accessToken });
//   });
// });

// app.post("/login", (req, res) => {
//1- Authenticate user

//2- accessToken
//   const email = req.body.email;
//   const user = { email: email };
//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefeshToken(user);
//   refreshTokens.push(refreshToken);
//   console.log(refreshTokens);
//   res.json({ accessToken: accessToken, refreshToken: refreshToken });
// });

// middleware to authenticate Token
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);

//     req.user = user;
//     next();
//   });
// }

// function to generateAccessToken
function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "900s",
  });
}

// function to generateRefreshToken
// function generateRefeshToken(payload) {
//   return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
// }

module.exports = router;
