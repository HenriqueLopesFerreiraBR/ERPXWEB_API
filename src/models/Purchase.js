const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Supplier = require('./Supplier');
const Product = require('./Product');

const Purchase = sequelize.define('Purchase', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Supplier,
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
  purchaseDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,  // Inclui os campos createdAt e updatedAt
});

module.exports = Purchase;
