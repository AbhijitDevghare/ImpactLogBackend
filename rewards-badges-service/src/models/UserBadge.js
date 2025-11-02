// models/UserBadge.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Badge = require('./Badge');

const UserBadge = sequelize.define('UserBadge', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false, // reference to User Service
  },
  badgeId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: Badge, key: 'id' },
  },
  awardedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'user_badges',
  timestamps: false,
});

// Associations
Badge.hasMany(UserBadge, { foreignKey: 'badgeId' });
UserBadge.belongsTo(Badge, { foreignKey: 'badgeId' });

module.exports = UserBadge;
