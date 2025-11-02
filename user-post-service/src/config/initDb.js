const sequelize = require('./db'); // your sequelize instance
const Post = require("../models/Post")
const PostSeen = require("../models/PostSeen")


async function initDB(syncModels = false) {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to Database");

    // Ensure associations are loaded
    Post,
    PostSeen
    if (syncModels) {
      await sequelize.sync({ alter: true });
      console.log("✅ Database models synced");
    }
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
    throw err;
  }
}

module.exports = { sequelize, initDB };
