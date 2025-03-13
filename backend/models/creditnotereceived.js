"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CreditNoteReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CreditNoteReceived.belongsTo(models.User, {
        foreignKey: "company_id",
        as: "User",
      });
    }
  }
  CreditNoteReceived.init(
    {
      credit_note_received_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: DataTypes.INTEGER,
      type_credit_note: DataTypes.STRING,
      point_sale: DataTypes.INTEGER,
      credit_note_number: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      supplier: DataTypes.STRING,
      subtotal: DataTypes.DECIMAL,
      IVA: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "CreditNoteReceived",
      tableName: "creditnotesreceived",
    }
  );
  return CreditNoteReceived;
};
