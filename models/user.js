'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
    static associate(models) {
      User.hasMany(models.MealPlan, { foreignKey: 'userId' });
      User.hasMany(models.CalorieAnalysis, { foreignKey: 'userId' });
    }
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

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