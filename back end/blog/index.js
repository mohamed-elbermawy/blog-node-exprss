const express = require("express");
require("dotenv").config();
var jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const userRouter = require("./routers/user");
const postRouter = require("./routers/posts");
const userValidation = require("./helper/userValidation");
const methodOverride = require("method-override");
const User = require("./models/user");
const { copyFileSync } = require("fs");
const cors = require("cors");

require("./db");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded());
app.use(methodOverride("_method"));

app.use("/public/images", express.static("public/images"));

app.use((req, res, next) => {
  console.table([
    {
      Method: req.method,
      URL: req.url,
      TimeStamp: new Date(),
    },
  ]);
  next();
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

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

// app.delete("/logout", (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
//   res.sendStatus(204);
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
// function generateAccessToken(user) {
//   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50s" });
// }

// function to generateRefreshToken
// function generateRefeshToken(user) {
//   return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
// }

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
