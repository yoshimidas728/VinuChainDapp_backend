'use strict';
/** @type {import('sequelize-cli').Migration} */
const {TABELS} = require("../utils/constants")
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABELS.USERS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      },
      about: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      walletAddress: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable(TABELS.USERS);
  }
};