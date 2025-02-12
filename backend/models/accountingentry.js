"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccountingEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AccountingEntry.belongsTo(models.JournalEntry, {
        foreignKey: "id_jor_entry",
      });
      AccountingEntry.belongsTo(models.Account, {
        foreignKey: "id_account",
      });
    }
  }
  AccountingEntry.init(
    {
      id_acc_entry: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_jor_entry: {
        type: DataTypes.INTEGER,
        references: {
          model: "JournalEntry",
          key: "id_entry",
        },
      },
      id_account: {
        type: DataTypes.INTEGER,
        references: {
          model: "Account",
          key: "id_account",
        },
      },
      credit: DataTypes.DECIMAL,
      credit: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "AccountingEntry",
    }
  );
  return AccountingEntry;
};
