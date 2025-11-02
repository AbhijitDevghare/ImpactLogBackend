const sequelize = require('./db');

// Load model associations for side effects (no need to reference variables)
try {
  require('../models/Associations');
} catch (e) {
  // Optional: log only if needed; keeping silent to avoid noisy startup when path differs
}

async function initDB(syncModels = false) {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Database');

    if (syncModels) {
      await sequelize.sync({ alter: true });
      console.log('✅ Database models synced');
    }
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    throw err;
  }
}

module.exports = { sequelize, initDB };
