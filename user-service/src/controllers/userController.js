const userService = require('../services/userService');
const UserResponseDTO = require('../dto/UserResponseDTO');
const AppError = require('../utils/error.utils');


async function getCommunities(req,res) {
  const communities = await userService.getCommunitiesFromDb();
  
  return res.status(200).json(
    {
      success:true,
      communities:communities
    }
  )
}

async function getProfileById(req,res,next)
{
  try {
    
      const user = await userService.getProfileDetailsFromDb(req.params.userId);
    
    console.log(req.params.userId)

      const userResponse = new UserResponseDTO(user);
      return res.status(201).json(
       {
        success:true,
        user:userResponse
       }
      )
  } catch (error) {
    console.log(error.message)
    next(new AppError(error.message,err.status))
  }
}


async function getUsersByUserIds(req,res,next) {
  try {
    console.log("getUsersByUserIds is hitted")
    const userIds = req.body.userIds;
    console.log(userIds)

    if(!userIds)
    {
      res.status(400).json({
        success:false,
        message:"Not able to get the user ids"
      })
    }

    const user = await userService.getUsersByUserIdsFromDb(userIds); 
    console.log(user)   
      res.status(200).json(
      {
        success:true,
        users:user
      }
    )

  } catch (error) {
    console.log(error.message)
  }
} 

async function getProfile(req, res, next) {
  try {
    const userId = req.user.id; 
    const user = await userService.getUserById(userId);

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    return res.json({
      message: 'User profile fetched successfully',
      user: new UserResponseDTO(user),
    });
  } catch (err) {
    console.error('userController.getProfile', err);
    return next(new AppError(err.message || 'Internal error', err.status || 500));
  }
}

async function updateProfile(req, res, next) {
  try {
    const userId = req.user.id; // from authMiddleware
    const updatedUser = await userService.updateUser(userId, req.body);

    return res.json({
      message: 'Profile updated successfully',
      user: new UserResponseDTO(updatedUser),
    });
  } catch (err) {
    console.error('userController.updateProfile', err);
    return next(new AppError(err.message || 'Internal error', err.status || 500));
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getProfileById,
  getCommunities,
  getUsersByUserIds
};
