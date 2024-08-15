const { User, Profile, Post, Comment } = require("../models");

class Controller {
  static async home(req, res) {
    try {
      const userSessionId = req.session.userId;
      const user = await User.findOne({
        attributes: ["id", "userName", "email"],
        where: {
          id: userSessionId,
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
      res.render("home", { user, posts, userSessionId });
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

  static async postComment(req, res) {
    try {
      const { userId, postId } = req.params;
      const { commentText } = req.body;

      await Comment.create({
        UserId: userId,
        PostId: postId,
        commentText: commentText,
        createdTime: new Date(),
      });

      res.redirect("/");
    } catch (error) {
      res.send(error);
    }
  }

  static async postFeed(req, res) {
    try {
      const { userId } = req.params;
      // Handle the uploaded file and form data
      console.log(req.file); // File details
      console.log(req.body); // Form data

      const newPost = await Post.create({
        caption: req.body.caption,
        imgUrl: req.file.filename, // Save the filename, or use the full path if required
        UserId: userId,
        postDate: new Date(),
      });

      res.redirect("/");
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = Controller;
