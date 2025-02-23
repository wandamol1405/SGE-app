"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Invoice, {
        foreignKey: "id_company",
        as: "invoices",
      });
      User.hasMany(models.BuyOrder, {
        foreignKey: "id_company",
        as: "buyOrders",
      });
    }
  }
  User.init(
    {
      id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      company_name: DataTypes.STRING,
      cuit: DataTypes.STRING,
      gross_revenue: DataTypes.INTEGER,
      business_address: DataTypes.STRING,
      IVA_condition: DataTypes.STRING,
      start_date: DataTypes.DATE,
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      is_admin: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
