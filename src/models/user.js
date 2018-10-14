"use strict";
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
    // associations can be defined here
  };
  return User;
};

// import { Model, DataTypes } from "sequelize";

// export class Users extends Model {
//   static init(sequelize) {
//     super.init(
//       {
//         email: {
//           type: DataTypes.STRING,
//           allowNull: false,
//           unique: true
//         },
//         password: {
//           type: DataTypes.STRING,
//           allowNull: false
//         },
//         username: {
//           type: DataTypes.STRING,
//           allowNull: false
//         },
//         total_session: {
//           type: DataTypes.INTEGER,
//           allowNull: false
//         }
//       },
//       {
//         sequelize
//       }
//     );
//   }
// }
