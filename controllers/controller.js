const {} = require("../models");
const { Op } = require("sequelize");

class Controller {
  static async home(req, res) {
    try {
      res.render("home");
    } catch (error) {
      res.send(error);
    }
  }

  static async loginForm(req, res) {
    try {
      res.render("loginForm");
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

  static async(req, res) {
    try {
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = Controller;
