'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    static associate(models) {
      Trainer.hasMany(models.Booking, {
        foreignKey: 'trainerId',
        as: 'bookings'
      });
    }
  }

  Trainer.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    specialization: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING,
    available_day: DataTypes.JSON,
    available_time: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Trainer',
    tableName: 'Trainers',
    timestamps: true
  });

  return Trainer;
};