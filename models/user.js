"use strict";
const { Model } = require("sequelize");

const bcrypt = require("bcryptjs");
const { use } = require("../routers");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
    }
  }
  User.init(
    {
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(async (user, option) => {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash;
  });
  return User;
};
