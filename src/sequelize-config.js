const { Sequelize } = require('sequelize');

const dotenv = require('dotenv')
dotenv.config()

const database = process.env.DATABASE
const user = process.env.USER_DB
const password = process.env.PASSWORD_DB
const host = process.env.HOST_DB
const dialectDb = process.env.DIALECT_DB

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: dialectDb,
});

module.exports = sequelize;
