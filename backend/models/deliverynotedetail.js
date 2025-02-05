"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryNoteDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DeliveryNoteDetail.belongsTo(models.DeliveryNote, {
        foreignKey: "id_delivery_note",
      });
    }
  }
  DeliveryNoteDetail.init(
    {
      id_delivery_note_detail: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_delivery_note: {
        type: DataTypes.INTEGER,
        references: {
          model: "deliveryNotes",
          key: "id",
        },
      },
      product: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      unit_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "DeliveryNoteDetail",
    }
  );
  return DeliveryNoteDetail;
};
