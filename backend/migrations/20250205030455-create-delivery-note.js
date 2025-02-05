"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("DeliveryNotes", {
      id_delivery_note: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type_delivery_note: {
        type: Sequelize.STRING,
      },
      point_sale: {
        type: Sequelize.INTEGER,
      },
      num_delivery_note: {
        type: Sequelize.INTEGER,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      id_company: {
        type: Sequelize.INTEGER,
      },
      buyer_name: {
        type: Sequelize.STRING,
      },
      buyer_address: {
        type: Sequelize.STRING,
      },
      buyer_IVA_condition: {
        type: Sequelize.STRING,
      },
      buyer_cuit: {
        type: Sequelize.STRING,
      },
      sale_condition: {
        type: Sequelize.STRING,
      },
      means_of_delivery: {
        type: Sequelize.STRING,
      },
      observation: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("DeliveryNotes");
  },
};
