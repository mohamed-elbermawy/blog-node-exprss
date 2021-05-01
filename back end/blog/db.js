const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/blogs", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect successfully");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
