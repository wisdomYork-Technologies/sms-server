"use strict";
import { Sequelize, Model, DataTypes, QueryInterface } from "sequelize";
import { db } from "../config/DbConfig";

export interface SuperAdminAttributes {
  [x: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolName: string;
  verified: boolean;
  salt: string;
  image: string;
  schoolLocation: string;
  address: string;
  gender: string;
  role: string;
  status: string;
}
export class SuperAdminInstance extends Model<SuperAdminAttributes> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare schoolName: string;
  declare verified: boolean;
  declare salt: string;
  declare image: string;
  declare schoolLocation: string;
  declare address: string;
  declare gender: string;
  declare role: string;
  declare status: string;
}

module.exports = {
  async up(
    queryInterface: QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.createTable("SuperAdminInstances", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Email address required" },
          isEmail: { msg: "Please provide a valid email" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Password is required" },
          notEmpty: { msg: "Provide a password" },
        },
      },
      schoolName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notNull: { msg: "User must be verified" },
          notEmpty: { msg: "User not verified" },
        },
        defaultValue: false,
      },
      salt: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Salt is required" },
          notEmpty: { msg: "Provide a salt" },
        },
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://res.cloudinary.com/dei55mzue/image/upload/v1683307328/edu-smart/avatar-edu-smart_upkosf.png",
      },
      schoolLocation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "active",
      },
    });
  },
  async down(
    queryInterface: QueryInterface,
    Sequelize: typeof import("sequelize")
  ) {
    await queryInterface.dropTable("SuperAdminInstances");
  },
};

// SuperAdminInstance.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//       allowNull: false,
//     },
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         notNull: { msg: "Email address required" },
//         isEmail: { msg: "Please provide a valid email" },
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: { msg: "Password is required" },
//         notEmpty: { msg: "Provide a password" },
//       },
//     },
//     schoolName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     verified: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       validate: {
//         notNull: { msg: "User must be verified" },
//         notEmpty: { msg: "User not verified" },
//       },
//       defaultValue: false,
//     },
//     salt: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: { msg: "Salt is required" },
//         notEmpty: { msg: "Provide a salt" },
//       },
//     },
//     image: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue:
//         "https://res.cloudinary.com/dei55mzue/image/upload/v1683307328/edu-smart/avatar-edu-smart_upkosf.png",
//     },
//     schoolLocation: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     role: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue: "active",
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "super_admin",
//   }
// );
