"use strict";
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Session",
    {
      ownerId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: DataTypes.STRING,
      address: {
        allowNull: false,
        type: DataTypes.STRING
      },
      district: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      start: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Session.associate = function(models) {
    Session.belongsToMany(models.User, {
      through: "UserSession",
      as: "users",
      foreignKey: "sessionId"
    });
  };
  return Session;
};
