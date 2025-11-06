const express = require('express');
const router = express.Router();
const AttendanceController = require('../../controllers/attendanceController');
const jwtAuth = require('../../middleware/jwtAuth');

// Mark attendance for a registration
router.post('/mark', AttendanceController.markAttendance);

// Get attendance for an event
router.get('/event/:eventId', AttendanceController.getAttendanceByEvent);

router.get("/user/:userId/:eventId",AttendanceController.getAttendanceByEventAndUser)

// Get attendance for a user
router.get('/user/:userId', jwtAuth, AttendanceController.getUserAttendance);

// Update attendance status (e.g., for admins)
router.put('/:attendanceId', jwtAuth, AttendanceController.updateAttendance);

module.exports = router;