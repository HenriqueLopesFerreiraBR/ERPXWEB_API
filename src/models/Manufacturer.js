const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize-config');

const Manufacturer = sequelize.define('Manufacturer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  website: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,  // Inclui os campos createdAt e updatedAt
});

module.exports = Manufacturer;
