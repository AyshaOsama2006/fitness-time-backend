'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

  class Contains extends Model {
     /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Contains.belongsTo(models.Cart, {
        foreignKey: 'cartId'
      });

      Contains.belongsTo(models.Product, {
        foreignKey: 'productId'
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