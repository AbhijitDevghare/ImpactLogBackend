const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Like = sequelize.define("Like", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  indexes: [
    { unique: true, fields: ["postId", "userId"] } // user can like a post only once
  ]
});

module.exports = Like;
