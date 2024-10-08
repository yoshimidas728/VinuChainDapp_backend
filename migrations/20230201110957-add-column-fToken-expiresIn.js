'use strict';
/** @type {import('sequelize-cli').Migration} */
const {TABELS} = require("../utils/constants")
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(TABELS.USERS, 'fToken', {
          type: Sequelize.DataTypes.STRING
        },
         { transaction: t }),
         queryInterface.addColumn(TABELS.USERS, 'expiresIn', {
          type: Sequelize.DataTypes.DATE
        },
         { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(TABELS.USERS, 'fToken', { transaction: t }),
        queryInterface.removeColumn(TABELS.USERS, 'expiresIn', { transaction: t }),
      ]);
    });
  }
};