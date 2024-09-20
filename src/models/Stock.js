const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Product = require('./Product');

const Stock = sequelize.define('Stock', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,  // Quantidade inicial é 0
  },
}, {
  timestamps: true,  // Inclui os campos createdAt e updatedAt
});

module.exports = Stock;
