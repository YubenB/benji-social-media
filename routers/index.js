const router = require("express").Router();
const Controller = require("../controllers/controller");
const AuthController = require("../controllers/authController");

router.get("/login", AuthController.loginForm);
router.post("/login", AuthController.postLogin);
router.get("/register", AuthController.registerForm);
router.post("/register", AuthController.postRegister);

router.use((req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    const errors = "You need to login first!";
    res.redirect(`/login?error=${errors}`);
  }
});

router.get("/", Controller.home);
router.get("/:userId/dashboard", Controller.dashboard);
router.post("/:userId/dashboard");
router.get("/:userId/setting", Controller.setting);

module.exports = router;
