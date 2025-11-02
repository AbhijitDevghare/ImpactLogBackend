const PointsService = require('../services/pointsService');

class PointsController {

static async giveRewards(req, res, next) {
  try {
    const { eventId, selectedUsers, badge_id, badge_name, points } = req.body;

    if (!eventId || !selectedUsers?.length)
      return res.status(400).json({ message: "Event ID and selected users are required" });

    // Loop through all selected users and award points
    for (const userId of selectedUsers) {
      await PointsService.awardPoints(userId, points, "Event Reward", `Reward for event ${eventId}`);
      if (badge_id && badge_name) {
        await PointsService.evaluateBadges(userId); // optional if badges depend on thresholds
      }
    }

    res.status(200).json({
      success: true,
      message: "Rewards and badges given successfully",
    });
  } catch (error) {
    console.error("Error giving rewards:", error);
    next(error);
  }
}

  
  static async getBadges (req,res)
  {
    try {
      const badges = await PointsService.getBadgesFromDb();
      res.status(200).json({
        success:true,
        badges:badges
      })
    } catch (error) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Award points to a user
  static async awardPoints(req, res) {
    try {
      const { userId, points, source, reason } = req.body;
      const ledgerEntry = await PointsService.awardPoints(userId, points, source, reason);
      res.status(201).json({ message: 'Points awarded', ledgerEntry });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Get all points for a user
  static async getUserPoints(req, res) {
    try {
      const { userId } = req.params;
      const points = await PointsService.getUserPoints(userId);
      res.json(points);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Get all badges for a user
  static async getUserBadges(req, res) {
    try {
      const { userId } = req.params;
      const badges = await PointsService.getUserBadges(userId);
      res.json(badges);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Get user tier
  static async getUserTier(req, res) {
    try {
      const { userId } = req.params;
      const tier = await PointsService.getUserTier(userId);
      res.json(tier);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Get leaderboard
  static async getLeaderboard(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 10;
      const leaderboard = await PointsService.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }

  // Evaluate badges for a user manually
  static async evaluateBadges(req, res) {
    try {
      const { userId } = req.params;
      await PointsService.evaluateBadges(userId);
      res.json({ message: 'Badges evaluated for user.' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = PointsController;
