// models/Post.js
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // your sequelize instance

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  authorId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  authorName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  authorProfileUrl:{
    type:DataTypes.STRING,
    allowNull:false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mediaUrls: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
}, {
  timestamps: true, // adds createdAt & updatedAt
  tableName: 'posts',
});

module.exports = Post;

  