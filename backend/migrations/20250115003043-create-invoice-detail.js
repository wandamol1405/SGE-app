"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("InvoiceDetails", {
      id_invoice_detail: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_invoice: {
        type: Sequelize.INTEGER,
      },
      product: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      sale_price: {
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
    await queryInterface.dropTable("InvoiceDetails");
  },
};
