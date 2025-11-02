const express = require('express');
const router = express.Router();
const PointsController = require('../../controllers/pointsController');
const jwtAuth = require('../../../../engagement-service/src/middleware/jwtAuth');

// Award points
router.post('/award', PointsController.awardPoints);

// Get all points for a user
router.get('/points/:userId', PointsController.getUserPoints);

router.get('/getBadges',PointsController.getBadges)

// Get all badges for a user
router.get('/badges/:userId', PointsController.getUserBadges);

// Get user tier
router.get('/tier/:userId', PointsController.getUserTier);

// Get leaderboard
router.get('/leaderboard', PointsController.getLeaderboard);

// Evaluate badges manually
router.post('/badges/evaluate/:userId', PointsController.evaluateBadges);

router.post("/giveRewards/:event_id", PointsController.giveRewards);


module.exports = router;
