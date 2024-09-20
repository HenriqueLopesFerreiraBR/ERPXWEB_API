const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Client = require('./Client');
const Product = require('./Product');

const Sale = sequelize.define('Sale', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
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
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  saleDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,  // Inclui os campos createdAt e updatedAt
});

module.exports = Sale;
