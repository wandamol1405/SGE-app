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
      // define association here
    }
  }
  JournalEntry.init(
    {
      id_entry: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: DataTypes.DATE,
      description: DataTypes.STRING,
      total_debit: DataTypes.DECIMAL,
      total_credit: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "JournalEntry",
    }
  );
  return JournalEntry;
};
