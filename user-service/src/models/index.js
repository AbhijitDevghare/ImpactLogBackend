const { Association } = require('sequelize');
const sequelize = require('../config/db');
const Follow = require('./Follows');
const User = require('./User');

module.exports = {
  sequelize,
  User,
  Follow,
  Association
};
