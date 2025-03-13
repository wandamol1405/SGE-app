"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CreditNoteDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CreditNoteDetail.belongsTo(models.CreditNote, {
        foreignKey: "id_credit_note",
      });
    }
  }
  CreditNoteDetail.init(
    {
      id_credit_note_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_credit_note: {
        type: DataTypes.INTEGER,
        references: {
          model: "CreditNotes", // name of the target model
          key: "id_credit_note", // key in the target model
        },
      },
      product: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      unit_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CreditNoteDetail",
      tableName: "creditnotedetails",
    }
  );
  return CreditNoteDetail;
};
