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

require("./db");

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");

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

app.get("/register", (req, res) => {
  res.render("register/register");
});

app.post("/register", async (req, res) => {
  const { error } = userValidation.userValidation(req.body);
  if (error) {
    console.log("error");
    console.log(error);
    res.redirect("/register");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let user = new User({
        email: req.body.email,
        firstname: req.body.firstname,
        username: req.body.username,
        password: hashedPassword,
        age: req.body.age,
      });
      user = await user.save();
      if (user != null) {
        console.log(user);
        res.redirect("/login");
      } else {
        res.redirect("/register");
      }
    } catch (error) {
      console.log(error);
      console.log("error");
      res.redirect("/register");
    }
  }
});

app.get("/login", (req, res) => {
  res.render("login/login");
  // const { error } = userValidation.loginValidation(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  // } else {
  //   next();
  // }
});

const posts = [
  {
    email: "a@gmail.com",
    title: "post1",
  },
  {
    email: "b@gmail.com",
    title: "post2",
  },
];

let refreshTokens = [];

app.get("/post", authenticateToken, (req, res) => {
  res.json(posts.filter((post) => post.email === req.user.email));
});

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  console.log(refreshToken);
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ email: user.email });
    res.json({ accessToken: accessToken });
  });
});

app.delete("/logout", (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.sendStatus(204);
});

app.post("/login", (req, res) => {
  //1- Authenticate user

  //2- accessToken
  const email = req.body.email;
  const user = { email: email };
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefeshToken(user);
  refreshTokens.push(refreshToken);
  console.log(refreshTokens);
  res.json({ accessToken: accessToken, refreshToken: refreshToken });
});

app.use("/users", userRouter);

app.use("/posts", postRouter);

// middleware to authenticate Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

// function to generateAccessToken
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50s" });
}

// function to generateRefreshToken
function generateRefeshToken(user) {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
