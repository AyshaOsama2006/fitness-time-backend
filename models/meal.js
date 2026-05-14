'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  Meal.belongsTo(models.MealPlan, { foreignKey: 'planId' });
}
  }
  Meal.init({
    planId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    calories: DataTypes.INTEGER,
    protein: DataTypes.FLOAT,
    carbs: DataTypes.FLOAT,
    fat: DataTypes.FLOAT,
    ingredients: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Meal',
  });
  return Meal;
};