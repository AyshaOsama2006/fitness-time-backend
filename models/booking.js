'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    booking_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    trainer_id: DataTypes.INTEGER,
    booking_date: DataTypes.DATE,
    booking_time: DataTypes.TIME,
    status: DataTypes.STRING,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};