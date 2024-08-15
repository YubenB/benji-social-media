const { User, Profile } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

class AuthController {
  static async loginForm(req, res) {
    try {
      const { error } = req.query;
      res.render("loginForm", { error });
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
        if (isPasswordValid) {
          req.session.userId = checkUser.id; // save session
          res.redirect("/");
        } else {
          const errors = "Password / Username Is not valid or not found";
          res.redirect(`/login?error=${errors}`);
        }
      } else {
        const errors = "Password / Username Is not valid or not found";

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
