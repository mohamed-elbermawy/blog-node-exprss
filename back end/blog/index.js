const express = require("express");
require("dotenv").config();
const path = require("path");
const userRouter = require("./routers/user");
const postRouter = require("./routers/posts");
const userValidation = require("./helper/userValidation");
const methodOverride = require("method-override");
const User = require("./models/user");
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
