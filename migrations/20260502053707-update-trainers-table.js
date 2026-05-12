'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.changeColumn('Trainers', 'bio', {
      type: Sequelize.TEXT
    });

    await queryInterface.changeColumn('Trainers', 'available_day', {
      type: Sequelize.JSON,
      allowNull: true
    });

    await queryInterface.changeColumn('Trainers', 'available_time', {
      type: Sequelize.JSON,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.changeColumn('Trainers', 'bio', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Trainers', 'available_day', {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn('Trainers', 'available_time', {
      type: Sequelize.STRING
    });
  }
};