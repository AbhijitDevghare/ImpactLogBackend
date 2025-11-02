// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../../controllers/postController');
const jwtAuth = require("../../middleware/jwtAuth")
const upload = require("../../middleware/multer")


// Routes
router.post('/', jwtAuth, upload.array("post"),postController.createPost);       // Create a new post
router.get('/', jwtAuth, postController.getLatestPosts);    // Get latest posts
router.post('/:postId/seen',jwtAuth , postController.markPostAsSeen); // Mark post seen
router.get("/user/:userId",postController.getUserPostById)

module.exports = router;
