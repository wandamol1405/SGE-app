"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PromissoryNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PromissoryNote.belongsTo(models.User, {
        foreignKey: "id_company",
        targetKey: "id_user",
      });
    }
  }
  PromissoryNote.init(
    {
      id_promissory_note: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "User", // name of the target table
          key: "id_user", // key in the target table
        },
      },
      issue_date: DataTypes.DATE,
      issue_place: DataTypes.STRING,
      amount: DataTypes.DECIMAL,
      manturity_date: DataTypes.DATE,
      manturity_days: DataTypes.INTEGER,
      receiver_name: DataTypes.STRING,
      pay_place: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "PromissoryNote",
    }
  );
  return PromissoryNote;
};
