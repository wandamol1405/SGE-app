"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("invoiceRecieveds", {
      invoice_received_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      type_invoice: {
        type: Sequelize.STRING,
      },
      point_sale: {
        type: Sequelize.INTEGER,
      },
      invoice_number: {
        type: Sequelize.INTEGER,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      supplier: {
        type: Sequelize.STRING,
      },
      subtotal: {
        type: Sequelize.DECIMAL,
      },
      IVA: {
        type: Sequelize.DECIMAL,
      },
      total: {
        type: Sequelize.DECIMAL,
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
    await queryInterface.dropTable("invoicesRecieved");
  },
};
