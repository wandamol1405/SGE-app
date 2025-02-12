"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AccountingEntries", {
      id_acc_entry: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jor_entry: {
        type: Sequelize.INTEGER,
      },
      id_account: {
        type: Sequelize.INTEGER,
      },
      credit: {
        type: Sequelize.DECIMAL,
      },
      credit: {
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
    await queryInterface.dropTable("AccountingEntries");
  },
};
