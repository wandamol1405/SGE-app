"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DebitNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DebitNote.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  DebitNote.init(
    {
      id_debit_note: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_debit_note: DataTypes.STRING,
      point_sale: DataTypes.INTEGER,
      num_debit_note: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users", // name of the target model
          key: "id", // key in the target model
        },
      },
      buyer_name: DataTypes.STRING,
      buyer_address: DataTypes.STRING,
      buyer_IVA_condition: DataTypes.STRING,
      buyer_cuit: DataTypes.STRING,
      sale_condition: DataTypes.STRING,
      subtotal: DataTypes.DECIMAL,
      IVA_total: DataTypes.DECIMAL,
      total: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "DebitNote",
    }
  );
  return DebitNote;
};
