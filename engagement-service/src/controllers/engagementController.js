const EngagementService = require("../services/engagementService");

class EngagementController {
  // Like a post
  static async likePost(req, res) {
    try {
      // const userId = req.user.id; // from JWT
      const userId="ee600e52-7efc-476c-8a5a-dea797ff495d"

      const { postId } = req.body;

      const like = await EngagementService.likePost(userId, postId);
      res.status(201).json(like);
    } catch (err) {
              console.log(err)

      res.status(400).json({ error: err.message });
    }
  }

  // Remove like
  static async removeLike(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.params;

      const deleted = await EngagementService.removeLike(userId, postId);
      res.json({ deleted });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Comment on post
  static async commentPost(req, res) {
    try {
      const userId = req.user.id;
      const { postId, content } = req.body;

      const comment = await EngagementService.commentPost(userId, postId, content);
      res.status(201).json(comment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get comments for a post
  static async getComments(req, res) {
    try {
      const { postId } = req.params;
      const limit = parseInt(req.query.limit) || 20;
      const offset = parseInt(req.query.offset) || 0;

      const comments = await EngagementService.getComments(postId, limit, offset);
      res.json(comments);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Share a post
  static async sharePost(req, res) {
    try {
      const userId = req.user.id;
      const { postId } = req.body;

      const share = await EngagementService.sharePost(userId, postId);
      res.status(201).json(share);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // Get engagement counts
  static async getEngagementCounts(req, res) {
    try {
      const { postId } = req.params;
      const counts = await EngagementService.getEngagementCounts(postId);
      res.json(counts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getEngagementCountsByIds(req,res)
  {
    try {
      console.log("COUNTS ENGAGEMNT ",req.body)
      const {postIds} = req.body;

      const counts = await EngagementService.getEngagementCountsByIdsFromDb(postIds);
      console.log("count response : ",counts)
      res.json(counts)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = EngagementController;
