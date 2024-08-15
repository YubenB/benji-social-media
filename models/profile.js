"use strict";
const { Model } = require("sequelize");
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
      private: DataTypes.BOOLEAN,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );

  Profile.beforeCreate(async (profile, option) => {
    if (!profile.firstName && !profile.lastName && !profile.profilePicture) {
      profile.firstName = "Edit";
      profile.lastName = "Your name";
      profile.profilePicture =
        "https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-18.jpg";
    }
  });
  return Profile;
};
