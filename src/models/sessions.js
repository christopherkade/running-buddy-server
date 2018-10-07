'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const Sessions = sequelize.define('Sessions', {
//     title: {
//       allowNull: false,
//       type: DataTypes.STRING
//     },
//     description: DataTypes.STRING,
//     address: {
//       allowNull: false,
//       type:DataTypes.STRING
//     }
//     district: {
//       allowNull: false,
//       type: DataTypes.INTEGER
//     },
//     start: {
//       allowNull: false,
//       type: DataTypes.DATE
//     },
//     owner_id: {
//       allowNull: false,
//       type: DataTypes.INTEGER
//     }
//   }, {});
//   Sessions.associate = function(models) {
//     // associations can be defined here
//   };
//   return Sessions;
// };

export class Sessions extends Model {
  static init(sequelize){
    super.init({
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      description: DataTypes.STRING,
      address: {
        allowNull: false,
        type:DataTypes.STRING
      }
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
      }}, {
        sequelize
      }
    );
  }
