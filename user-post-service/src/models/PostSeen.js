// models/PostSeen.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Post = require('./Post');

const PostSeen = sequelize.define('PostSeen', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Post,
      key: 'id',
    },
  },
  seenAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
  tableName: 'post_seen',
});

module.exports = PostSeen;
