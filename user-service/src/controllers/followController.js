const FollowService = require('../services/followsService');

class FollowController {
// Follow a user 
static async followUser(req, res) {
  try {
    // const followerId = "ee600e52-7efc-476c-8a5a-dea797ff495d"; // hardcoded follower
    const followerId = req?.user?.id; 
    const followingId = req.params.id;                       // dynamic from URL

    if (!followingId) {
      return res.status(400).json({ error: "FollowingId is required" });
    }

    const result = await FollowService.followUser(followerId, followingId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Follow Error:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}

// Unfollow a user
static async unfollowUser(req, res) {
  try {
    // const followerId = "ee600e52-7efc-476c-8a5a-dea797ff495d"; // hardcoded follower
    const followerId = req?.user?.id; 
    const followingId = req.params.id;                         // dynamic from URL

    if (!followingId) {
      return res.status(400).json({ error: "FollowingId is required" });
    }

    const result = await FollowService.unfollowUser(followerId, followingId);
    res.status(200).json(result);
  } catch (err) {
    console.error("Unfollow Error:", err.message);
    res.status(err.statusCode || 500).json({ error: err.message });
  }
}


  // Get all followers of a user
  static async getFollowers(req, res) {
    try {
      const { id: userId } = req.params;
      const followers = await FollowService.getFollowers(userId);
      res.status(200).json(followers);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }

  // Get all users that a user is following
  static async getFollowing(req, res) {
    try {
      const { id: userId } = req.params;
      const following = await FollowService.getFollowing(userId);
      res.status(200).json(following);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  }
}

module.exports = FollowController;
