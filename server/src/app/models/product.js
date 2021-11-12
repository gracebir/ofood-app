'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Product.init({
    name: DataTypes.STRING,
    alt: DataTypes.STRING,
    desc: DataTypes.STRING,
    categorie: DataTypes.STRING,
    avatar: DataTypes.STRING,
    datastatus: DataTypes.INTEGER,
    date: DataTypes.STRING,
    button: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};