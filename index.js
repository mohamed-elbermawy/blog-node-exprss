const express = require("express");
require("dotenv").config();
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

app.post("/login", (req, res) => {});

app.use("/users", userRouter);

app.use("/posts", postRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
