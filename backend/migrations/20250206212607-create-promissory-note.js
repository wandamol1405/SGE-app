"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("PromissoryNotes", {
      id_promissory_note: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      issue_date: {
        type: Sequelize.DATE,
      },
      id_company: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id_user",
        },
      },
      issue_place: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.DECIMAL,
      },
      manturity_date: {
        type: Sequelize.DATE,
      },
      receiver_name: {
        type: Sequelize.STRING,
      },
      pay_place: {
        type: Sequelize.STRING,
      },
      interest: {
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
    await queryInterface.dropTable("PromissoryNotes");
  },
};
