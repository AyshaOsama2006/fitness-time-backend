'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init({
    trainer_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    specialization: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
    available_day: DataTypes.STRING,
    available_time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};