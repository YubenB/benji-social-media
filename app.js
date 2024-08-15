const express = require("express");
const app = express();
const port = 3000;
const session = require("express-session");
const multer = require("multer");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use("/uploads", express.static("uploads"));

app.use("/", require("./routers")); // Ensure this points to your router file

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
