const { where } = require("sequelize");
const { User, Profile, Post, Comment } = require("../models");

class Controller {
  static async home(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findOne({
        attributes: ["id", "userName", "email"],
        where: {
          id: userId,
        },
        include: Profile,
      });

      const posts = await Post.findAll({
        include: [
          {
            model: User,
            include: {
              model: Profile,
            },
          },
          {
            model: Comment,
            include: {
              model: User,
              include: {
                model: Profile,
              },
            },
          },
        ],
      });

      // res.send(posts);
      res.render("home", { user, posts });
    } catch (error) {
      res.send(error);
    }
  }

  static async dashboard(req, res) {
    try {
      const { userId } = req.params;
      const profile = await Profile.findOne({
        where: {
          UserId: +userId,
        },
      });

      res.render("dashboard", { profile });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async setting(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);

      res.render("setting", { user });
    } catch (error) {
      res.send(error);
    }
  }

  static async postSetting(req, res) {
    try {
      const {
        userName,
        email,
        password,
        oldPassword,
        newPassword,
        confirmPassword,
      } = req.body;
      // console.log(req.body, "<<<<");
      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
