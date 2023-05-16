("use strict");
import { Model, DataTypes, Sequelize } from "sequelize";
import { SuperAdminAttributes } from "../migrations/Super";

module.exports = (
  sequelize: Sequelize,
  DataTypes: typeof import("sequelize")
) => {
  class SuperAdminInstance extends Model<SuperAdminAttributes> {
    static associate(models: any) {
      // define association here
    }
  }

  SuperAdminInstance.init(
    {
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
      role: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SuperAdminInstance",
    }
  );

  return SuperAdminInstance;
};
