"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define(
    "UserSession",
    {
      sessionId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  UserSession.associate = function(models) {
    // associations can be defined here
  };
  return UserSession;
};
