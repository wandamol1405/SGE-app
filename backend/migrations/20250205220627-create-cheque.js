"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cheques", {
      id_cheque: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_company: {
        type: Sequelize.INTEGER,
        references: { model: "users", key: "id_user" },
      },
      cheque_num: {
        type: Sequelize.INTEGER,
      },
      bank_name: {
        type: Sequelize.STRING,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      issue_place: {
        type: Sequelize.STRING,
      },
      cheque_type: {
        type: Sequelize.STRING,
      },
      emission_mode: {
        type: Sequelize.STRING,
      },
      certified: {
        type: Sequelize.BOOLEAN,
      },
      crossed: {
        type: Sequelize.BOOLEAN,
      },
      receiver_name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      collection_date: {
        type: Sequelize.DATE,
      },
      account_number: {
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
    await queryInterface.dropTable("Cheques");
  },
};
