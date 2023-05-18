'use strict';
/** @type {import('sequelize-cli').Migration} */
const { DataTypes } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email address required" },
          isEmail: { msg: "Please provide a valid email" },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Provide a password" },
        },
      },
      schoolName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "User must be verified" },
          notEmpty: { msg: "User not verified" },
        },
        defaultValue: false,
      },
      salt: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Salt is required" },
          notEmpty: { msg: "Provide a salt" },
        },
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue:
          "https://res.cloudinary.com/dei55mzue/image/upload/v1683307328/edu-smart/avatar-edu-smart_upkosf.png",
      },
      schoolLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      permissions: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "active",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};