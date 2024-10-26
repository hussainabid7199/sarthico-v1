"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("roles", {
      uniqueId: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      roleId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
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
        uniqueId: "86274be1fdb869ab18e80bfb48a118", 
        roleId: 1, 
        roleName: "Administrator",
      },
      {
        uniqueId: "d49854aeb7c34472e5e79e1019f826", 
        roleId: 2, 
        roleName: "User",
      },
      {
        uniqueId: "27e21322b726d654e47eb419d5882d", 
        roleId: 3, 
        roleName: "Technician",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "roles",
      {
        uniqueId: [
          "86274be1fdb869ab18e80bfb48a118",
          "d49854aeb7c34472e5e79e1019f826",
          "27e21322b726d654e47eb419d5882d",
        ],
        roleId: [
          1,
          2,
          3,
        ],
      },
      {}
    );
    await queryInterface.dropTable("roles");
  },
};
