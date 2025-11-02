const { User } = require('../models/index'); // Ensure this imports associations
const AppError = require('../utils/error.utils');

class FollowService {

  // Follow a user
  static async followUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new AppError("You cannot follow yourself", 400);
    }

    const follower = await User.findByPk(followerId);
    const following = await User.findByPk(followingId);

    if (!follower || !following) {
      throw new AppError("User not found", 404);
    }

    const alreadyFollowing = await follower.hasFollowing(following);
    if (alreadyFollowing) {
      throw new AppError(`You are already following ${following.name}`, 400);
    }

    // Add following relationship
    await follower.addFollowing(following);

    // Increment counts atomically
    await Promise.all([
      follower.increment('following_count', { by: 1 }),
      following.increment('followers_count', { by: 1 })
    ]);

    return {
      message: `You are now following ${following.name}`,
      followerId,
      followingId
    };
  }

  // Unfollow a user
  static async unfollowUser(followerId, followingId) {
    if (followerId === followingId) {
      throw new AppError("You cannot unfollow yourself", 400);
    }

    console.log(followerId,followingId)

    const follower = await User.findByPk(followerId);
    const following = await User.findByPk(followingId);

    if (!follower || !following) {
      throw new AppError("User not found", 404);
    }

    const isFollowing = await follower.hasFollowing(following);
    if (!isFollowing) {
      throw new AppError(`You are not following ${following.name}`, 400);
    }

    // Remove following relationship
    await follower.removeFollowing(following);

    // Decrement counts atomically
    await Promise.all([
      follower.decrement('following_count', { by: 1 }),
      following.decrement('followers_count', { by: 1 })
    ]);

    return {
      message: `You have unfollowed ${following.name}`,
      followerId,
      followingId
    };
  }

  // Get all followers of a user
  static async getFollowers(userId) {
    const user = await User.findByPk(userId, {
      include: [{
        model: User,
        as: 'Followers',
        attributes: ['id', 'name', 'username', 'avatarUrl'],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      count: user.followers_count,
      followers: user.Followers
    };
  }

  // Get all users that this user is following
  static async getFollowing(userId) {
    const user = await User.findByPk(userId, {
      include: [{
        model: User,
        as: 'Following',
        attributes: ['id', 'name', 'username', 'avatarUrl'],
        through: { attributes: [] }
      }]
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return {
      count: user.following_count,
      following: user.Following
    };
  }
}

module.exports = FollowService;
