'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.renameColumn('Bookings', 'user_id', 'userId');
    await queryInterface.renameColumn('Bookings', 'trainer_id', 'trainerId');
    await queryInterface.renameColumn('Bookings', 'booking_date', 'bookingDate');
    await queryInterface.renameColumn('Bookings', 'booking_time', 'bookingTime');
    await queryInterface.renameColumn('Bookings', 'created_at', 'createdAt');

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.renameColumn('Bookings', 'userId', 'user_id');
    await queryInterface.renameColumn('Bookings', 'trainerId', 'trainer_id');
    await queryInterface.renameColumn('Bookings', 'bookingDate', 'booking_date');
    await queryInterface.renameColumn('Bookings', 'bookingTime', 'booking_time');
    await queryInterface.renameColumn('Bookings', 'createdAt', 'created_at');

  }
};
