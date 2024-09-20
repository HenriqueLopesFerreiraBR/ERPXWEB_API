const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactInfo: {
    type: DataTypes.STRING,
    allowNull: true,  // Pode ser opcional
  },
}, {
  timestamps: true,  // Inclui os campos createdAt e updatedAt
});

module.exports = Supplier;
