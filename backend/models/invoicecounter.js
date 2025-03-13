"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class InvoiceCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InvoiceCounter.belongsTo(models.User, {
        foreignKey: "company_id",
      });
    }
  }
  InvoiceCounter.init(
    {
      company_id: DataTypes.INTEGER,
      last_invoice_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "InvoiceCounter",
      tableName: "invoicecounters",
    }
  );
  return InvoiceCounter;
};
