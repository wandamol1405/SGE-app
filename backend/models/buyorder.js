"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuyOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BuyOrder.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  BuyOrder.init(
    {
      id_order: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_number: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      delivery_date: DataTypes.DATE,
      sale_condition: DataTypes.STRING,
      id_company: DataTypes.INTEGER,
      supplier_name: DataTypes.STRING,
      supplier_address: DataTypes.STRING,
      supplier_cuit: DataTypes.STRING,
      supplier_condition: DataTypes.STRING,
      subtotal: DataTypes.INTEGER,
      IVA: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BuyOrder",
    }
  );
  return BuyOrder;
};
