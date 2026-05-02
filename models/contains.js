'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Contains extends Model {
    static associate(models) {

      Contains.belongsTo(models.Cart, {
        foreignKey: 'cartId',
        as: 'cart'
      });

      Contains.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product'
      });

    }
  }

  Contains.init({
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },

    quantity: DataTypes.INTEGER,
    priceAtTime: DataTypes.FLOAT

  }, {
    sequelize,
    modelName: 'Contains',
  });

  return Contains;
};