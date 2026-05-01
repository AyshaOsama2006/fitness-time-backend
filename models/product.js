'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Product extends Model {
    static associate(models) {

      Product.belongsToMany(models.Cart, {
        through: models.Contains,
        foreignKey: 'productId',
        otherKey: 'cartId'
      });

      Product.hasMany(models.Contains, {
        foreignKey: 'productId'
      });

    }
  }

  Product.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    image: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};