const { where } = require("sequelize");
const { User, Profile, Post } = require("../models");

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
        include: {
          model: User,
          include: {
            model: Profile,
          },
        },
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

  static async(req, res) {
    try {
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

  static async(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
