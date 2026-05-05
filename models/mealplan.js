'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MealPlan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
  MealPlan.belongsTo(models.User, { foreignKey: 'userId' });
  MealPlan.hasMany(models.Meal, { foreignKey: 'planId' });
}
  }
  MealPlan.init({
    userId: DataTypes.INTEGER,
    goal: DataTypes.STRING,
    favorites: DataTypes.TEXT,
    dislikes: DataTypes.TEXT,
    ingredients: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'MealPlan',
  });
  return MealPlan;
};