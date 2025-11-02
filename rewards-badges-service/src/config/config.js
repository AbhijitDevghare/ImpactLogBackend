require('dotenv').config({ path: '../../.env' });

// Database configuration using environment variables with fallbacks
module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'abhi',
  password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ImpactLog',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres', // or 'mysql', 'mariadb', 'sqlite', 'mssql'
  },
  test: {
    username: process.env.DB_USERNAME || 'abhi',
  password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ImpactLog',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
  production: {
    username: process.env.DB_USERNAME || 'abhi',
  password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'ImpactLog',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
  },
};
