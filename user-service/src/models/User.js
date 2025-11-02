const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: { isEmail: true, notEmpty: true, len: [5, 255] },
  },

  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true, len: [2, 100] },
  },

  username: {
    type: DataTypes.STRING(50),
    allowNull: true,
    unique: true,
    validate: { is: /^[a-zA-Z0-9_]+$/i, len: [3, 50] },
  },

  role: {
    type: DataTypes.ENUM('USER', 'NGO', 'GOVERNMENT', 'ADMIN', 'COMMUNITY'),
    allowNull: false,
    defaultValue: 'USER',
  },

  contactNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    validate: { is: /^[0-9+\-\s()]*$/i },
  },

  // ✅ Avatar should always be a string URL
  avatarUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isUrl: true },
    defaultValue:
      'https://res.cloudinary.com/dorfg8nqt/image/upload/v1756380305/ImpactLogProfile/Profile/default_profile_qptrer.jpg',
  },

  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  followers_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  following_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
  lastLoginAt: { type: DataTypes.DATE, allowNull: true },
  failedLoginAttempts: { type: DataTypes.INTEGER, defaultValue: 0 },
  lockUntil: { type: DataTypes.DATE, allowNull: true },
  profileCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },

  // ✅ Add these for OTP + reset password
  otp: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  otpExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  resetPasswordExpires: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: true,
  paranoid: true,
  indexes: [
    { fields: ['email'], unique: true },
    { fields: ['username'], unique: true },
    { fields: ['role'] },
  ],
});

module.exports = User;
