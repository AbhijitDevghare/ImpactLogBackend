const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.DB_NAME ;
const dbUser = process.env.DB_USER ;
const dbPass = typeof process.env.DB_PASS === 'undefined' ? '' : String(process.env.DB_PASS);
const dbHost = process.env.DB_HOST ;
const dbPort = process.env.DB_PORT ;
const dbDialect = process.env.DB_DIALECT || 'postgres';

// console.log(`DB connect -> host=${dbHost} port=${dbPort} user=${dbUser} name=${dbName} dialect=${dbDialect}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: false, // set true if you want SQL logs
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
module.exports.sequelize = sequelize;

