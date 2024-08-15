const { User, Profile } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

class AuthController {
  static async loginForm(req, res) {
    try {
      res.render("loginForm");
    } catch (error) {
      res.send(error);
    }
  }

  static async postLogin(req, res) {
    try {
      const { userName, password } = req.body;

      const checkUser = await User.findOne({
        where: {
          userName,
        },
      });

      if (checkUser) {
        const isPasswordValid = bcrypt.compareSync(
          password,
          checkUser.password
        );

        const errors = "Password Tidak Sama";
        isPasswordValid
          ? res.redirect("/")
          : res.redirect(`/login?error=${errors}`);
      } else {
        const errors = "Password Tidak Sama";

        res.redirect(`/login?error=${errors}`);
      }
    } catch (error) {
      res.send(error);
    }
  }

  static registerForm(req, res) {
    try {
      res.render("registerForm");
    } catch (error) {
      res.send(error);
    }
  }

  static async postRegister(req, res) {
    try {
      const { userName, email, password } = req.body;
      console.log(req.body);

      const newUser = await User.create({ userName, email, password });
      await Profile.create({
        UserId: newUser.id,
      });
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = AuthController;
