"use strict";
const { Model } = require("sequelize");
const { profile } = require("../controllers/controller");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      bio: DataTypes.STRING,
      profilePicture: DataTypes.STRING,
      privacy: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  Profile.beforeCreate(async (profile, option) => {
    if (!profile.firstName && !profile.lastName) {
      profile.firstName = "Edit";
      profile.lastName = "Your Name";
    }
    if (!profile.profilePicture) {
      profile.profilePicture = "default";
    }
    if (!profile.privacy) {
      profile.privacy = "Public";
    }
  });

  Profile.beforeUpdate(async (profile, option) => {
    if (profile.profilePicture.length === 0) {
      profile.profilePicture = "default";
    }
  });
  return Profile;
};
