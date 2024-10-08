"use strict";
/** @type {import('sequelize-cli').Migration} */
const { TABELS } = require("../utils/constants");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABELS.POSTS, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      tags: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
      },
      description: {
        type: Sequelize.JSON,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: TABELS.USERS,
          },
          key: "id",
        },
        allowNull: true,
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
    await queryInterface.dropTable(TABELS.POSTS);
  },
};
