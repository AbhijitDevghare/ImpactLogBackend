const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Registration = require('./Registration');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  registrationId: {
    type: DataTypes.UUID,
    allowNull: false, // references local registration
  },
  checkinTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  checkinMethod: {
    type: DataTypes.ENUM('QR', 'OTP', 'Geofence'),
    allowNull: false,
  },
  proofUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'attendances',
});

// Associations
Registration.hasOne(Attendance, { foreignKey: 'registrationId' });
Attendance.belongsTo(Registration, { foreignKey: 'registrationId' });

module.exports = Attendance;
