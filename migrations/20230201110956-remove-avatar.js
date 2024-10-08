"use strict";
/** @type {import('sequelize-cli').Migration} */
const { TABELS } = require("../utils/constants");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(TABELS.USERS, 'avatar', { transaction: t }),
        queryInterface.addColumn(TABELS.USERS, 'avatar', {
          type: Sequelize.DataTypes.TEXT('long'),
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(TABELS.USERS, 'avatar', { transaction: t }),
      ]);
    });
  }
};