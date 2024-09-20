const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const OrderProduct = sequelize.define('OrderProduct', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

module.exports = OrderProduct;
