const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Setup multer for handling file uploads

const Controller = require("../controllers/controller");
const AuthController = require("../controllers/authController");

// Existing routes
router.get("/login", AuthController.loginForm);
router.post("/login", AuthController.postLogin);
router.get("/register", AuthController.registerForm);
router.post("/register", AuthController.postRegister);

// Middleware to check if the user is logged in
router.use((req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const errors = "You need to login first!";
    res.redirect(`/login?error=${errors}`);
  }
});

// Existing routes
router.get("/", Controller.home);
router.post("/:userId/postFeed", upload.single("content"), Controller.postFeed);
router.get("/:userId/dashboard", Controller.dashboard);
router.post("/:userId/dashboard");
router.get("/:userId/setting", Controller.setting);
router.post("/:userId/setting", Controller.postSetting);
router.post("/:userId/:postId/postComment", Controller.postComment);

module.exports = router;
