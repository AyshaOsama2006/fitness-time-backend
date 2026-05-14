'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Cart extends Model {
    static associate(models) {

      Cart.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Cart.belongsToMany(models.Product, {
        through: models.Contains,
        foreignKey: 'cartId',
        otherKey: 'productId',
        as: 'products'
      });

      Cart.hasMany(models.Contains, {
        foreignKey: 'cartId',
        as: 'containsItems'
      });

    }
  }

  Cart.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    status: DataTypes.STRING,
    userId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Cart',
  });

  return Cart;
};