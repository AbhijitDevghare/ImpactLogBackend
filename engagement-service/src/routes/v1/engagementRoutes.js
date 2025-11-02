const express = require("express");
const EngagementController = require("../../controllers/engagementController");
const authMiddleware = require("../../middleware/jwtAuth"); // reuse JWT auth

const router = express.Router();

// Likes
router.post("/like", EngagementController.likePost);
router.delete("/like/:postId", authMiddleware, EngagementController.removeLike);

// Comments
router.post("/comment", authMiddleware, EngagementController.commentPost);
router.get("/comments/:postId", authMiddleware, EngagementController.getComments);

// Shares
router.post("/share", authMiddleware, EngagementController.sharePost);

// Engagement counts
router.get("/counts/:postId", authMiddleware, EngagementController.getEngagementCounts);

// engagement counts for number of ids 
router.post("/counts",EngagementController.getEngagementCountsByIds)

module.exports = router;
    