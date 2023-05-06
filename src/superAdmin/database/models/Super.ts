import { Sequelize, Model, DataTypes } from "sequelize";
import { db } from "../../../config/DbConfig";

export interface SuperAdminAttributes {
  [x: string]: any;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verified: boolean;
  salt: string;
  image: string;
  location: string;
  gender: string;
  role: string;
  status: boolean;
}

export class SuperAdminInstance extends Model<SuperAdminAttributes> {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare verified: boolean;
  declare salt: string;
  declare image: string;
  declare location: string;
  declare gender: string;
  declare role: string;
  declare status: boolean;
}

SuperAdminInstance.init(
  {
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
    location: {
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
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "super_admin",
  }
);
