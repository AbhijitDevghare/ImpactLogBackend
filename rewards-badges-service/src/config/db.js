const { Sequelize } = require('sequelize');
require('dotenv').config();

// Read DB config from environment with sensible fallbacks
const dbName = process.env.DB_NAME || 'ImpactLog';
const dbUser = process.env.DB_USERNAME || process.env.DB_USER || 'abhi';
const dbPass = typeof process.env.DB_PASSWORD !== 'undefined' ? String(process.env.DB_PASSWORD) : (process.env.DB_PASS || 'radhe');
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;
const dbDialect = process.env.DB_DIALECT || 'postgres';

// console.log(`DB connect -> host=${dbHost} port=${dbPort} user=${dbUser} name=${dbName} dialect=${dbDialect}`);

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: dbDialect,
  logging: false, // set true if you want SQL logs
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;

