"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DebitNoteCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DebitNoteCounter.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  DebitNoteCounter.init(
    {
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      debit_note_type: DataTypes.STRING,
      last_debit_note_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DebitNoteCounter",
      tableName: "debitnotecounters",
    }
  );
  return DebitNoteCounter;
};
