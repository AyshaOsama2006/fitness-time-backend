'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'User_id'
      });

      Cart.belongsToMany(models.Product, {
        through: models.Contains,
        foreignKey: 'Cart_id',
        otherKey: 'product_id'
      });

      Cart.hasMany(models.Contains, {
        foreignKey: 'Cart_id'
      });
    }
  }

  Cart.init({
    Cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    status: DataTypes.STRING,
    User_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'Carts',
    underscored: true
  });

  return Cart;
};