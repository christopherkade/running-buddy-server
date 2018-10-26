"use strict";
module.exports = (sequelize, DataTypes) => {
  const Session = sequelize.define(
    "Sessions",
    {
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
      },
      owner_id: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Session.associate = function(models) {
    // associations can be defined here
  };
  return Session;
};
