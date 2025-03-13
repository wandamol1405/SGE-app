"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DebitNoteDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DebitNoteDetail.belongsTo(models.DebitNote, {
        foreignKey: "id_debit_note",
      });
    }
  }
  DebitNoteDetail.init(
    {
      id_debit_note_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_debit_note: {
        type: DataTypes.INTEGER,
        references: {
          model: "DebitNotes", // name of the target model
          key: "id_debit_note", // key in the target model
        },
      },
      product: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      unit_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DebitNoteDetail",
      tableName: "debitnotedetails",
    }
  );
  return DebitNoteDetail;
};
