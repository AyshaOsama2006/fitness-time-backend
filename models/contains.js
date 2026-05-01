'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contains extends Model {
    static associate(models) {
      Contains.belongsTo(models.Cart, {
        foreignKey: 'Cart_id'
      });

      Contains.belongsTo(models.Product, {
        foreignKey: 'product_id'
      });
    }
  }

  Contains.init({
    Cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    quantity: DataTypes.INTEGER,
    price_at_time: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Contains',
    tableName: 'Contains',
    underscored: true
  });

  return Contains;
};