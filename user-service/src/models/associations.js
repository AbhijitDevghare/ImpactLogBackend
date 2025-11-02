const User = require('./User.js');
const Follow = require('./Follows');

// A user can follow many users
User.belongsToMany(User, {
  through: Follow,
  as: 'Following',      // user.getFollowing()
  foreignKey: 'followerId',
  otherKey: 'followingId'
});

// A user can be followed by many users
User.belongsToMany(User, {
  through: Follow,
  as: 'Followers',      // user.getFollowers()
  foreignKey: 'followingId',
  otherKey: 'followerId'
});

module.exports = { User, Follow };
