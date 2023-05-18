'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    schoolName: DataTypes.STRING,
    verified: DataTypes.BOOLEAN,
    salt: DataTypes.STRING,
    image: DataTypes.STRING,
    schoolLocation: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    permissions: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};