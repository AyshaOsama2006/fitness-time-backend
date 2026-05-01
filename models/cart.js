'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Cart extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Cart.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Cart.belongsToMany(models.Product, {
        through: models.Contains,
        foreignKey: 'cartId',
        otherKey: 'productId'
      });

      Cart.hasMany(models.Contains, {
        foreignKey: 'cartId'
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