"use strict";
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
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
        allowNull: false
      }
    },
    {}
  );
  Users.associate = function(models) {
    // associations can be defined here
  };
  return Users;
};
