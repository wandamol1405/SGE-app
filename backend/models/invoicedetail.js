"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceDetail.init(
    {
      id_invoice_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_invoice: {
        type: DataTypes.INTEGER,
        references: { model: "Invoice", key: "id_invoice" },
      },
      product: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      sale_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "InvoiceDetail",
    }
  );
  return InvoiceDetail;
};
