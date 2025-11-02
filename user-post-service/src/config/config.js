require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    username: process.env.DB_USER || "abhi",
    password: process.env.DB_PASS || "radhe",
    database: process.env.DB_NAME || "ImpactLog",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || 'postgres', // or 'mysql', 'mariadb', 'sqlite', 'mssql'
  },
  test: {
    username: process.env.DB_USER || "abhi",
    password: process.env.DB_PASS || "radhe",
    database: process.env.DB_NAME || "ImpactLog",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USER || "abhi",
    password: process.env.DB_PASS || "radhe",
    database: process.env.DB_NAME || "ImpactLog",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || 'postgres',
  },
};
