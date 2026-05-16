'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrderItems', 'orderitems_ibfk_2');

    await queryInterface.addConstraint('OrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'orderitems_productId_fkey',
      references: {
        table: 'Products',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('OrderItems', 'orderitems_productId_fkey');

    await queryInterface.addConstraint('OrderItems', {
      fields: ['productId'],
      type: 'foreign key',
      name: 'orderitems_ibfk_2',
      references: {
        table: 'Products',
        field: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  }
};
