require('dotenv').config({ path: '../../.env' });

module.exports = {
  development: {
    username: "abhi",
    password: "radhe",
    database: "ImpactLog",
    host: "localhost",
    dialect: 'postgres', // or 'mysql', 'mariadb', 'sqlite', 'mssql'
  },
  test: {
    username: "abhi",
    password: "radhe",
    database: "ImpactLog",
    host: "localhost",
    dialect: 'postgres',
  },
  production: {
    username: "abhi",
    password: "radhe",
    database: "ImpactLog",
    host: "localhost",
    dialect: 'postgres',
  },
};
