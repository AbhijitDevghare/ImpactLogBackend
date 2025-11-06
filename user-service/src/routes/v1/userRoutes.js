const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const jwtAuth = require('../../middleware/jwtAuth');
const FollowController = require('../../controllers/followController');

// User related endpoints (protected)
router.get('/profile',jwtAuth, userController.getProfile);
router.put('/profile', jwtAuth, userController.updateProfile);
router.get("/communities",userController.getCommunities)
router.get('/profile/:userId',userController.getProfileById)
// get the users 
router.post("/getUsersByUserIds",userController.getUsersByUserIds)


// ----------------------------------------------------------//
router.post('/:id/follow',jwtAuth, FollowController.followUser);
router.delete('/:id/unfollow',jwtAuth, FollowController.unfollowUser);
router.get('/:id/followers', FollowController.getFollowers);
router.get('/:id/following', FollowController.getFollowing);
router.get("/communities",userController.getCommunities)



module.exports = router;
