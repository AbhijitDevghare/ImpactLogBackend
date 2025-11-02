const { User } = require('../models');
const AppError = require('../utils/error.utils');
const FollowService = require('./followsService');
const { Op } = require("sequelize");


  async function getProfileDetailsFromDb(userId) {
    console.log(userId)
    const user = await User.findByPk(userId);

    if (!user) return null; // in case user doesn't exist
    
    
    const followers = await FollowService.getFollowers(userId);
    const following = await FollowService.getFollowing(userId);

  

    const userDetails = {
      ...user.toJSON(),   
      followers,          
      following           
    };

    return userDetails;
  }


async function getUserById(userId) {
  const user = await User.findByPk(userId, {
    attributes: { exclude: ['password'] } // never return password
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const followers = await FollowService.getFollowers(userId);
  const following = await FollowService.getFollowing(userId);

  // Merge into a single plain object
  return {
    ...user.toJSON(),
    followers,
    following
  };
}

async function getUsersByUserIdsFromDb(userIds) {
  const users = await User.findAll({
    where: {
      id: userIds
    },
    attributes: { exclude: ['passwordHash', 'otp', 'otpExpires', 'resetPasswordToken', 'resetPasswordExpires'] },
    raw: true
  });
  return users; // returns plain JS objects
}

async function updateUser(userId, updateData) {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  // Update only allowed fields
  const allowedUpdates = ['name', 'username', 'contactNumber', 'avatarUrl', 'bio'];
  allowedUpdates.forEach((field) => {
    if (updateData[field] !== undefined) {
      user[field] = updateData[field];
    }
  });

  await user.save();

  // Exclude password in response
  const { password, ...safeUser } = user.toJSON();
  return safeUser;
}


async function getCommunitiesFromDb() {
  const communities = await User.findAll({
    where: {
      role: {
        [Op.in]: [ 'NGO', 'GOVERNMENT', 'COMMUNITY']
      }
    }
  });
  return communities;
}


module.exports = {
  getUserById,
  updateUser,
  getProfileDetailsFromDb,
  getCommunitiesFromDb,
  getUsersByUserIdsFromDb
};
