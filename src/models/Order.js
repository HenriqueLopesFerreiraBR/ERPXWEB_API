const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');
const Client = require('./Client');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Definindo o relacionamento
Order.belongsTo(Client, { foreignKey: 'clientId', as: 'client' });
Order.belongsToMany(Product, { through: 'OrderProduct', foreignKey: 'orderId', as: 'products' });

module.exports = Order;
