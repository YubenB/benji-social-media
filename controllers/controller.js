const { User, Profile } = require("../models");
const { Op, where } = require("sequelize");
const { use } = require("../routers");

class Controller {
  static async home(req, res) {
    try {
      const userId = req.session.userId;
      const user = await User.findOne({
        attributes: ["id", "userName", "email"],
        where: {
          id: userId,
        },
        include: {
          model: Profile,
        },
      });
      // res.send(user);
      res.render("home", { user });
    } catch (error) {
      res.send(error);
    }
  }

  static async dashboard(req, res) {
    try {
      res.render("dashboard");
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

  static async(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
