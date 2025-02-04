"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BuyOrders", {
      id_order: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_number: {
        type: Sequelize.INTEGER,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      delivery_date: {
        type: Sequelize.DATE,
      },
      sale_condition: {
        type: Sequelize.STRING,
      },
      id_company: {
        type: Sequelize.INTEGER,
      },
      supplier_name: {
        type: Sequelize.STRING,
      },
      supplier_address: {
        type: Sequelize.STRING,
      },
      supplier_cuit: {
        type: Sequelize.STRING,
      },
      subtotal: {
        type: Sequelize.INTEGER,
      },
      IVA: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("BuyOrders");
  },
};
