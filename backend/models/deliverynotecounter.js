"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DeliveryNoteCounter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DeliveryNoteCounter.belongsTo(models.User, {
        foreignKey: "id_company",
      });
    }
  }
  DeliveryNoteCounter.init(
    {
      id_delivery_note_counter: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_company: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      last_delivery_note_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DeliveryNoteCounter",
    }
  );
  return DeliveryNoteCounter;
};
