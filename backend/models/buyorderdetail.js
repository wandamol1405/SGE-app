"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuyOrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BuyOrderDetail.belongsTo(models.BuyOrder, {
        foreignKey: "id_order",
      });
    }
  }
  BuyOrderDetail.init(
    {
      id_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_order: DataTypes.INTEGER,
      product: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      unit_price: DataTypes.INTEGER,
      subtotal: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BuyOrderDetail",
      tableName: "buyorderdetails",
    }
  );
  return BuyOrderDetail;
};
