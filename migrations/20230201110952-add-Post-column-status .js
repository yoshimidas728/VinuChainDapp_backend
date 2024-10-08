'use strict';
/** @type {import('sequelize-cli').Migration} */
const {TABELS} = require("../utils/constants")
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(TABELS.POSTS, 'status', {
          type: Sequelize.DataTypes.STRING
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn(TABELS.POSTS, 'status', { transaction: t }),
      ]);
    });
  }
};