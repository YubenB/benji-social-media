"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    get formatDate() {
      const dateString = this.postDate;
      const date = new Date(dateString);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hour}:${minutes}`;
    }
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.hasMany(models.Comment);
    }

    static async customFind(search, sort) {
      let option = {
        include: [
          {
            model: sequelize.models.User,
            include: {
              model: sequelize.models.Profile,
            },
          },
          {
            model: sequelize.models.Comment,
            include: {
              model: sequelize.models.User,
              include: {
                model: sequelize.models.Profile,
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

      if (sort) {
        option.order = [["postDate", "desc"]];
      }

      return await Post.findAll(option);
    }
  }
  Post.init(
    {
      caption: DataTypes.TEXT,
      imgUrl: DataTypes.STRING,
      postDate: DataTypes.DATE,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
