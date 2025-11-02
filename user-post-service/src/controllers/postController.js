// controllers/postController.js
const postService = require('../services/postService');
const AppError = require('../utils/error.utils');

/**
 * Create a new post
 */
async function createPost(req, res) {
  try {
    const { content } = req.body;

    const userId = req.user.id; // assuming auth middleware sets req.user
    const username = req.user.username;
    console.log(userId, content, req.files,username)
    const post = await postService.createPost(userId, content, req.files,username);
    res.status(201).json({ success: true, post });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ success: false, message: "Failed to create post" });
  }
}


/**
 * Get latest posts
 */
async function getLatestPosts(req, res) {
  try {
    const userId = req.user.id;

    const posts = await postService.getLatestPosts(userId);
    res.status(200).json({   success: true, posts });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
}

/**
 * Mark a post as seen
 */
async function markPostAsSeen(req, res) {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    const result = await postService.markPostAsSeen(userId, postId);
    res.status(200).json({ success: true, result });
  } catch (err) {
    console.error("Error marking post as seen:", err);
    res.status(500).json({ success: false, message: "Failed to mark post as seen" });
  }
}

async function getUserPostById(req,res) {
  try {
      const userPosts = await postService.getUserPostByIdFromDb(req.params.userId);
      return res.status(201).json({
        success:true,
        posts:userPosts
      })
  } catch (error) {
      next(new AppError(err.message,err.status))
  }
}

module.exports = {
  createPost,
  getLatestPosts,
  markPostAsSeen,
  getUserPostById
};
