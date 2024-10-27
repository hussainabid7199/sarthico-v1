'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("users_otp", {
      uniqueId: {
        type: Sequelize.UUID,
        allowNull: true,
        primaryKey: true,
      },
      otp: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("users_otp");
  }
};
