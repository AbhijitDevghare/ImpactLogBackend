// models/PointsLedger.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PointsLedger = sequelize.define('PointsLedger', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false, // reference to User Service
  },
  source: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'Event ID or source of points',
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Points earned or deducted',
    
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Optional description for audit',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'points_ledger',
  timestamps: false, // using custom createdAt
});

module.exports = PointsLedger;
