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
          firstName : "Author",
          lastName : "1",
          email: "author@test.com",
          password: await bcrypt.hash("123456789", MESSAGES.SALT_BCRYPT),
          displayName : "Author",
          about : "",
          avatar : "https://i.pinimg.com/736x/36/a2/e2/36a2e242bfe3ac039e0618fbaaef7596.jpg",
          role : ENUMS.ISAUTHOR,
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
