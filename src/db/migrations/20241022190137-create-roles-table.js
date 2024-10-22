"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      roleId: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      roleName: {
        type: Sequelize.STRING(36),
        allowNull: false,
      },
      createdOn: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert("roles", [
      {
        roleId: "2c5e174e-3b0e-446f-86af-483d56fd7210",
        roleName: "Administrator",
      },
      {
        roleId: "748424A0-0288-499B-839D-F1F99A7F870D",
        roleName: "User",
      },
      {
        roleId: "b0e-44174e-3483d5af-86fd66f-86fd7210",
        roleName: "Technician",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "roles",
      {
        role_id: [
          "2c5e174e-3b0e-446f-86af-483d56fd7210",
          "748424A0-0288-499B-839D-F1F99A7F870D",
          "b0e-44174e-3483d5af-86fd66f-86fd7210",
        ],
      },
      {}
    );
    await queryInterface.dropTable("roles");
  },
};
