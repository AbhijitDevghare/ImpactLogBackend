const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const upload = require('../../middleware/multer');

// signup routes
router.post(
            '/signup',
            upload.single("avatar"),
            authController.signup);

router.post('/login', authController.login);
router.post('/verify-token', authController.verifyToken);
router.get('/logout',authController.logout)



// Password Reset Routes
router.post("/password/forgot/verify-email", authController.forgetPassword);
router.post("/password/forgot/send-otp", authController.sendOtp);
router.post("/password/reset/verify-otp", authController.verifyOtp);
router.put("/password/reset/:resetToken", authController.resetPassword);

module.exports = router;
    