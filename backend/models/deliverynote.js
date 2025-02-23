"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryNote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DeliveryNote.belongsTo(models.User, {
        foreignKey: "id_company",
      });
      DeliveryNote.hasMany(models.DeliveryNoteDetail, {
        foreignKey: "id_delivery_note",
        as: "details",
      });
    }
  }
  DeliveryNote.init(
    {
      id_delivery_note: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_delivery_note: DataTypes.STRING,
      point_sale: DataTypes.INTEGER,
      num_delivery_note: DataTypes.INTEGER,
      issue_date: DataTypes.DATE,
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      buyer_name: DataTypes.STRING,
      buyer_address: DataTypes.STRING,
      buyer_IVA_condition: DataTypes.STRING,
      buyer_cuit: DataTypes.STRING,
      sale_condition: DataTypes.STRING,
      means_of_delivery: DataTypes.STRING,
      observation: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DeliveryNote",
    }
  );
  return DeliveryNote;
};
