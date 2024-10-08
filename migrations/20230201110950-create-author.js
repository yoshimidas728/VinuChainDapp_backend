"use strict";
/** @type {import('sequelize-cli').Migration} */
const { TABELS } = require("../utils/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABELS.AUTHORS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      q1: {
        type: Sequelize.STRING,
      },
      q2: {
        type: Sequelize.STRING,
      },
      q3: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: TABELS.USERS,
          },
          key: "id",
        },
        allowNull: false,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
    await queryInterface.dropTable(TABELS.AUTHORS);
  },
};
