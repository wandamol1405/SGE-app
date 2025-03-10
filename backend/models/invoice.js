"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoice.belongsTo(models.User, {
        foreignKey: "id_company",
      });
      Invoice.hasMany(models.InvoiceDetail, {
        foreignKey: "id_invoice",
        as: "details",
      });
    }
  }
  Invoice.init(
    {
      id_invoice: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_invoice: DataTypes.STRING,
      point_sale: DataTypes.INTEGER,
      num_invoice: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      id_company: {
        type: DataTypes.INTEGER,
        references: { model: "User", key: "id_user" },
      },
      buyer_name: DataTypes.STRING,
      buyer_address: DataTypes.STRING,
      buyer_IVA_condition: DataTypes.STRING,
      buyer_cuit: DataTypes.STRING,
      sale_condition: DataTypes.STRING,
      subtotal: DataTypes.DECIMAL,
      IVA_total: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Invoice",
      tableName: "invoices",
    }
  );
  return Invoice;
};
