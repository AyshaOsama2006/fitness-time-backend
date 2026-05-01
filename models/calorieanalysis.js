'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalorieAnalysis extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalorieAnalysis.init({
    userId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    protein: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    fat: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'CalorieAnalysis',
  });
  return CalorieAnalysis;
};