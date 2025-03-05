"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DebitNoteReceived extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DebitNoteReceived.belongsTo(models.User, {
        foreignKey: "company_id",
        as: "User",
      });
    }
  }
  DebitNoteReceived.init(
    {
      debit_note_received_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: DataTypes.INTEGER,
      type_debit_note: DataTypes.STRING,
      point_sale: DataTypes.INTEGER,
      debit_note_number: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      supplier: DataTypes.STRING,
      subtotal: DataTypes.DECIMAL,
      IVA: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "DebitNoteReceived",
      tableName: "debitNotesReceived",
    }
  );
  return DebitNoteReceived;
};
