const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/", Controller.home);
router.get("/login", Controller.loginForm);

module.exports = router;
