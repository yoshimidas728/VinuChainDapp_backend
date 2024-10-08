'use strict';
/** @type {import('sequelize-cli').Migration} */
const {TABELS} = require("../utils/constants")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABELS.BALANCES, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABELS.BALANCES);
  }
};