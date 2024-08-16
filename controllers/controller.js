const { Op } = require("sequelize");
const { User, Profile, Post, Comment } = require("../models");

class Controller {
  static async home(req, res) {
    try {
      const search = req.query.search;
      const userSessionId = req.session.userId;

      const user = await User.findOne({
        attributes: ["id", "userName", "email"],
        where: {
          id: userSessionId,
        },
        include: Profile,
      });

      let option = {
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
      };

      if (search) {
        option.include[0].where = {
          userName: {
            [Op.iLike]: `%${search}%`,
          },
        };
      }

      const posts = await Post.findAll(option);

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

      res.render("dashboard", { profile, userId });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async postDashboard(req, res) {
    try {
      const { userId } = req.params;
      const { firstName, lastName, bio, privacy } = req.body;
      let profilePicture = "default";

      if (req.file) {
        profilePicture = req.file.filename;
      }
      await Profile.update(
        { firstName, lastName, bio, privacy, profilePicture: profilePicture },
        {
          where: {
            UserId: userId,
          },
        }
      );
      res.redirect("/");
    } catch (error) {
      res.send(error.message);
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
      const { caption } = req.body;
      let imgUrl = null;
      if (req.file) {
        const { filename } = req.file;
        imgUrl = filename;
      }

      const newPost = await Post.create({
        caption: caption,
        imgUrl: imgUrl, // Save the filename, or use the full path if required
        UserId: userId,
        postDate: new Date(),
      });

      res.redirect("/");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async deletePost(req, res) {
    try {
      const { userId } = req.params;
      const { postId } = req.body;
      console.log(req.body, "<<<");
      await Post.destroy({
        where: {
          id: +postId,
        },
      });
      res.redirect(`/${userId}/profile`);
    } catch (error) {
      res.send(error.message);
    }
  }

  static async profile(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findOne({
        attributes: ["id", "userName", "email"],
        include: Profile,
        where: {
          id: userId,
        },
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
        where: {
          UserId: userId,
        },
      });

      // res.send(user);
      res.render("profileDetail", { user, posts });
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = Controller;
