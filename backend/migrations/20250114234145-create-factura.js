"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Invoice", {
      id_invoice: {
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
      num_invoice: {
        type: Sequelize.INTEGER,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      company_id: {
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
      subtotal: {
        type: Sequelize.DECIMAL,
      },
      IVA_total: {
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
    await queryInterface.dropTable("Invoice");
  },
};
