"use strict";
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      total_session: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {}
  );

  User.associate = function(models) {
    User.belongsToMany(models.Session, {
      through: "UserSession",
      as: "sessions",
      foreignKey: "userId"
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(), 10);
  });
  return User;
};
