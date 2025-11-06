const AttendanceService = require('../services/attendanceService');

class AttendanceController {

static async getAttendanceByEventAndUser(req, res) {
  try {
    // console.log("getAttendanceByEventAndUser")
    // console.log(req.params)
    let { eventId, userId } = req.params;
    if (!userId) {
      userId = req.user.id;
    }

    const attendance = await AttendanceService.getAttendanceByEventAndUserFromDb(userId, eventId);

    // if (!attendance) {
    //   return res.status(400).json({ message: "No attendance found" });
    // }

    res.status(200).json({ attendance });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

  static async markAttendance(req, res) {
  try {
    const { checkinMethod, userId, eventId } = req.body;
    console.log(req.body);

    // Call the service
    const attendance = await AttendanceService.markAttendance(userId, checkinMethod, eventId);

    // Send success response
    res.status(201).json(attendance);
  } catch (err) {
    console.log(err);
    // Send error response
    res.status(400).json({ message: err.message });
  }
}


  static async getAttendanceByEvent(req, res) {
    try {
      const { eventId } = req.params;
      const attendances = await AttendanceService.getAttendanceByEvent(eventId);
      res.json(attendances);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getUserAttendance(req, res) {
    try {
      let { userId } = req.params;
      if (!userId) userId = req.user.id;
      const attendances = await AttendanceService.getUserAttendance(userId);
      res.json(attendances);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateAttendance(req, res) {
    try {
      const { attendanceId } = req.params;
      const updates = req.body; // e.g., { status: 'present' }
      const attendance = await AttendanceService.updateAttendance(attendanceId, updates);
      res.json(attendance);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AttendanceController;