// config/initRedis.js
const { createClient } = require("redis");

let redisClient = null;

async function initRedis() {
  const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";

  try {
    const client = createClient({ url: redisUrl });
    client.on("error", (err) => console.error("Redis error:", err));

    await client.connect();
    redisClient = client;

    console.log("✅ Connected to Redis");
    return client;
  } catch (err) {
    console.warn("⚠️ Redis unavailable, using in-memory store:", err.message);
    return null;
  }
}

function getRedisClient() {
  return redisClient;
}

module.exports = { initRedis, getRedisClient };
