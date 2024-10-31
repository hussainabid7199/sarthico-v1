'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('service', {
      serviceId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      uniqueId: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      serviceName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
      updatedOn: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {

     await queryInterface.dropTable('users');

  }
};
