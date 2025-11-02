// models/Badge.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Badge = sequelize.define('Badge', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  criteria: {
    type: DataTypes.JSONB,
    allowNull: false,
    comment: 'JSON rule to determine badge eligibility',
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  tier: {
    type: DataTypes.ENUM('Bronze', 'Silver', 'Gold', 'Platinum'),
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'badges',
  timestamps: false,
});

module.exports = Badge;
