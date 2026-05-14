'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Booking extends Model {
    static associate(models) {

      Booking.belongsTo(models.Trainer, {
        foreignKey: 'trainerId',
        as: 'trainer'
      });

    }
  }

  Booking.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    userId: DataTypes.INTEGER,
    trainerId: DataTypes.INTEGER,
    bookingDate: DataTypes.DATE,
    bookingTime: DataTypes.TIME,
    status: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Booking',
    
  });

  return Booking;
};