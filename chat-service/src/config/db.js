const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbName = process.env.DB_NAME ;
const dbUser = process.env.DB_USER ;
const dbPass = typeof process.env.DB_PASS === 'undefined' ? '' : String(process.env.DB_PASS);
const dbHost = process.env.DB_HOST ;
const dbPort = process.env.DB_PORT ;
const dbDialect = process.env.DB_DIALECT || 'postgres';

console.log(`DB connect -> host=${dbHost} port=${dbPort} user=${dbUser} name=${dbName} dialect=${dbDialect}`);

const sequelize = new Sequelize("ImpactLog", "abhi", "radhe", {
  host: "localhost",
  port: 5432,
  dialect: "postgres",
  logging: false, // set true if you want SQL logs
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;


// DB_HOST=localhost
// DB_PORT=5432
// DB_USER=abhi
// DB_PASS=radhe
// DB_NAME=ImpactLog
// DB_DIALECT=postgres
