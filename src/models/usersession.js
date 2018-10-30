'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSession = sequelize.define(
    'userSession',
    {
      sessionId: {
        allowNull: false,
        type: DataTypes.INTEGER
      } 
      ownerId: 
      {
        allowNull: false,
        type: DataTypes.INTEGER
      }
      usersId: 
      {
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

