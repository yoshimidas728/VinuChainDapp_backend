"use strict";
const bcrypt = require("bcrypt");
const { TABELS ,MESSAGES,ENUMS} = require("../utils/constants");

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      TABELS.USERS,
      [
        {
          firstName : "Admin",
          lastName : "VITE",
          email: "admin@vite.com",
          password: await bcrypt.hash("login@3221", MESSAGES.SALT_BCRYPT),
          displayName : "VITE ADMIN",
          about : "",
          avatar : "https://www.shareicon.net/data/256x256/2016/05/26/771188_man_512x512.png",
          role : ENUMS.ADMIN,
          walletAddress : "vite_1d15e2ed07e2ea6fc9432729b85508f543ed1d6f616b6587ac",
          createdAt : new Date(),
          updatedAt : new Date()
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(TABELS.USERS, null, {});
  },
};
