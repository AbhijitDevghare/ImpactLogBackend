const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Registration = sequelize.define('Registration', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false, // references User Service ID
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false, // references Event Service ID
  },
  status: {
    type: DataTypes.ENUM('registered', 'waitlist', 'cancelled'),
    allowNull: false,
    defaultValue: 'registered',
  },
  positionInWaitlist: {
    type: DataTypes.INTEGER,
    allowNull: true, // only if status = waitlist
  },
  registeredAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  tableName: 'registrations',
  indexes: [
    {
      unique: true,
      fields: ['userId', 'eventId'] // composite unique key
    }
  ]
});

module.exports = Registration;
