"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BuyOrderCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      BuyOrderCounter.belongsTo(models.User, {
        foreignKey: "company_id",
      });
    }
  }
  BuyOrderCounter.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: DataTypes.INTEGER,
      last_buy_order_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "BuyOrderCounter",
      tableName: "buyordercounters",
    }
  );
  return BuyOrderCounter;
};
