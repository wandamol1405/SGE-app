"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CreditNoteCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CreditNoteCounter.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  CreditNoteCounter.init(
    {
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      last_credit_note_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CreditNoteCounter",
    }
  );
  return CreditNoteCounter;
};
