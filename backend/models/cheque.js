"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cheque extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cheque.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  Cheque.init(
    {
      id_cheque: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_company: {
        type: DataTypes.INTEGER,
        references: { model: "Users", key: "id" },
      },
      cheque_num: DataTypes.INTEGER,
      bank_name: DataTypes.STRING,
      issue_date: DataTypes.DATE,
      issue_place: DataTypes.STRING,
      cheque_type: DataTypes.STRING,
      emission_mode: DataTypes.STRING,
      certified: DataTypes.BOOLEAN,
      crossed: DataTypes.INTEGER,
      receiver_name: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      collection_date: DataTypes.DATE,
      account_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cheque",
      tableName: "cheques",
    }
  );
  return Cheque;
};
