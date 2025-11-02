const Badge = require('./Badge');
const UserBadge = require('./UserBadge');
const PointsLedger = require("./PointsLedger")

// One badge can belong to many user badges
Badge.hasMany(UserBadge, { foreignKey: 'badgeId', as: 'userBadges' });

// Each user badge belongs to one badge
UserBadge.belongsTo(Badge, { foreignKey: 'badgeId', as: 'badge' });

module.exports = { Badge, UserBadge, PointsLedger };
