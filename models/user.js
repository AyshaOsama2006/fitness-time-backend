'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {

      User.hasMany(models.CalorieAnalysis, {
        foreignKey: 'userId'
      });

    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    age: DataTypes.INTEGER,
    height: DataTypes.FLOAT,
    weight: DataTypes.FLOAT,
    activityLevel: DataTypes.STRING,
    fitnessGoal: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};