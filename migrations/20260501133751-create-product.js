'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      stock: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};