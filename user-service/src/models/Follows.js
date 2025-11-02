const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Follow = sequelize.define('Follow', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' }
  },
  followingId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: User, key: 'id' }
  }
}, {
  tableName: 'follows',
  timestamps: true,
  indexes: [
    { fields: ['followerId'] },
    { fields: ['followingId'] },
    { unique: true, fields: ['followerId', 'followingId'] } // Prevent duplicates
  ]
});

module.exports = Follow;
