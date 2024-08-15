const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.home);
router.get("/login", Controller.loginForm);
router.get("/register", Controller.registerForm);

module.exports = router;
