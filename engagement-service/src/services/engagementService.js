const { Like, Comment, Share } = require("../models");
const { getRedisClient } = require("../config/initRedis"); // optional caching for counts
const axios = require("axios");
const NodeCache = require("node-cache"); // optional in-memory cache
const { response } = require("../app");
const userCache = new NodeCache({ stdTTL: 300 }); // 5 min cache

class EngagementService {
  // Like a post
  static async likePost(userId, postId) {
    // Save in DB
    const like = await Like.create({ userId, postId }).catch(err => {
      if (err.name === "SequelizeUniqueConstraintError") {
        throw new Error("User already liked this post");
      } else {
        throw err;
      }
    });

    // Update Redis count (optional)
    const redis = getRedisClient();
    if (redis) {
      const redisKey = `post:${postId}:likes`;
      await redis.incr(redisKey);
    }

    return like;
  }

  // Remove like
  static async removeLike(userId, postId) {
    const deleted = await Like.destroy({ where: { userId, postId } });

    // Update Redis count
    const redis = getRedisClient();
    if (deleted && redis) {
      const redisKey = `post:${postId}:likes`;
      await redis.decr(redisKey);
    }

    return deleted;
  }

  // Comment on post
  static async commentPost(userId, postId, content) {
    console.log("userId, postId, content",userId, postId, content)
    const comment = await Comment.create({ userId, postId, content });

    // Optional: Update comment count in Redis
    const redis = getRedisClient();
    if (redis) {
      const redisKey = `post:${postId}:comments`;
      await redis.incr(redisKey);
    }

    return comment;
  }

  // Get all comments for a post
  static async getComments(postId, limit = 20, offset = 0) {
    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });
    return comments;
  }

  // Share a post
  static async sharePost(userId, postId) {
    const share = await Share.create({ userId, postId });

    // Optional: Update Redis share count
    const redis = getRedisClient();
    if (redis) {
      const redisKey = `post:${postId}:shares`;
      await redis.incr(redisKey);
    }

    return share;
  }

  // Get engagement counts for a post
  static async getEngagementCounts(postId) {
    const redis = getRedisClient();
    if (redis) {
      // First try Redis
      const likes = parseInt(await redis.get(`post:${postId}:likes`)) || 0;
      const comments = parseInt(await redis.get(`post:${postId}:comments`)) || 0;
      const shares = parseInt(await redis.get(`post:${postId}:shares`)) || 0;

      return {
        likes: likes || (await Like.count({ where: { postId } })),
        comments: comments || (await Comment.count({ where: { postId } })),
        shares: shares || (await Share.count({ where: { postId } })),
      };
    } else {
      // Fallback to DB if Redis not available
      return {
        likes: await Like.count({ where: { postId } }),
        comments: await Comment.count({ where: { postId } }),
        shares: await Share.count({ where: { postId } }),
      };
    }
  }


static async getEngagementCountsByIdsFromDb(postIds) {
  const redis = getRedisClient();
  const results = {};

  if (redis) {
    const pipeline = redis.multi();
    postIds.forEach((postId) => {
      pipeline.get(`post:${postId}:likes`);
      pipeline.get(`post:${postId}:comments`);
      pipeline.get(`post:${postId}:shares`);
    });

    const redisData = (await pipeline.exec()) || [];

    for (let i = 0; i < postIds.length; i++) {
      const base = i * 3;
      const safe = (idx) =>
        Array.isArray(redisData[idx]) && redisData[idx][1]
          ? JSON.parse(redisData[idx][1])
          : [];

      const postId = postIds[i];
      results[postId] = {
        likes: safe(base),
        comments: safe(base + 1),
        shares: safe(base + 2),
      };
    }

    // Fallback to DB if Redis empty
    for (const postId of postIds) {
      const data = results[postId];
      if (!data.likes.length && !data.comments.length && !data.shares.length) {
        const [likes, comments, shares] = await Promise.all([
          Like.findAll({ where: { postId }, attributes: ["userId"] }),
          Comment.findAll({ where: { postId }, attributes: ["userId"] }),
          Share.findAll({ where: { postId }, attributes: ["userId"] }),
        ]);
        results[postId] = {
          likes: likes.map((l) => l.userId),
          comments: comments.map((c) => c.userId),
          shares: shares.map((s) => s.userId),
        };
      }
    }
  }

  // Gather all userIds across posts
  const uniqueUserIds = new Set();
  Object.values(results).forEach((data) => {
    [...data.likes, ...data.comments, ...data.shares].forEach((id) =>
      uniqueUserIds.add(id)
    );
  });

  // Cache check
  const cachedUsers = {};
  const missingUserIds = [];
  uniqueUserIds.forEach((id) => {
    const cached = userCache.get(id);
    if (cached) cachedUsers[id] = cached;
    else missingUserIds.push(id);
  });

  // 🔥 Fetch missing users (array response)
  let fetchedUsersArray = [];
  if (missingUserIds.length) {
    try {
      const res = await axios.post(
        "http://localhost:3000/users/getUsersByUserIds",
        { userIds: missingUserIds }
      );
      fetchedUsersArray = res.data.users || [];
      console.log("User service response:", fetchedUsersArray);

      // Convert array → object keyed by id
      fetchedUsersArray.forEach((user) => {
        if (user.id) {
          userCache.set(user.id, user);
          cachedUsers[user.id] = user;
        }
      });
    } catch (err) {
      console.error("User-service fetch failed:", err.message);
    }
  }

  const allUsers = cachedUsers;

  // Attach user details to each engagement entry
  for (const [postId, data] of Object.entries(results)) {
    const enrich = (ids) =>
      ids.map((id) => allUsers[id] || { id, name: "Unknown User" });

    results[postId] = {
      likes: enrich(data.likes),
      comments: enrich(data.comments),
      shares: enrich(data.shares),
    };
  }

  return results;
}

}
module.exports = EngagementService;
