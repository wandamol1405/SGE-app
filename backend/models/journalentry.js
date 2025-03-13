"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class JournalEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JournalEntry.hasMany(models.AccountingEntry, {
        foreignKey: "id_jor_entry",
        as: "accountingEntries",
      });
    }
  }
  JournalEntry.init(
    {
      id_entry: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id_user",
        },
      },
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      total_debit: DataTypes.DECIMAL,
      total_credit: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "JournalEntry",
      tableName: "Journalentries",
    }
  );

  return JournalEntry;
};
