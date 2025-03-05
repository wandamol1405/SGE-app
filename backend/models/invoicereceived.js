"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoiceReceived.belongsTo(models.User, {
        foreignKey: "company_id",
        as: "User",
      });
    }
  }
  InvoiceReceived.init(
    {
      invoice_received_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      type_invoice: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      point_sale: DataTypes.INTEGER,
      invoice_number: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      supplier: DataTypes.STRING,
      subtotal: DataTypes.DECIMAL,
      IVA: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "InvoiceReceived",
      tableName: "invoicesReceived",
    }
  );
  return InvoiceReceived;
};
