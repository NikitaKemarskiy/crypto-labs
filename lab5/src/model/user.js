const { Model } = require('sequelize');
const config = require('config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}

  User.init({
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    compromised: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    passwordVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: config.db.passwordVersion,
    }
  }, {
    sequelize,
    modelName: 'user',
  });

  return User;
};
