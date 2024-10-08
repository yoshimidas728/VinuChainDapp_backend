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
          firstName : "user1",
          lastName : "user1",
          email: "user@test.com",
          password: await bcrypt.hash("123456789", MESSAGES.SALT_BCRYPT),
          displayName : "Basic User",
          about : "",
          avatar : "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1686250283~exp=1686250883~hmac=2320b8222556122e534ca4e491a3bf8d07f5a6ac7bcfc178fc533c4666333732",
          role : ENUMS.USER,
          walletAddress : "vite_914c2b3bba96113b2321b8f475f95c8eb3f15fee2b73a733ad",
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
