const Attendance = require('../models/Attendance'); // Assuming Attendance model exists
const Registration = require('../models/Registration'); // For validation
const RegistrationService = require('./registrationService');

class AttendanceService {
      static async getAttendanceByEventAndUserFromDb(userId, eventId) {
        const registration = await Registration.findOne({
          where: { userId, eventId },
          attributes: ['id']
        });

        console.log("REGISTRAIOTN",registration)
        if (!registration) return null;

        const attendance = await Attendance.findOne({
          where: { registrationId: registration.id }
        });

        return attendance;
      }



  static async markAttendance(userId, checkinMethod, eventId) {
  // Check registration for this user and event
  const registration = await Registration.findOne({
    where: { userId, eventId }
  });

  if (!registration) {
    throw new Error('Invalid registration or unauthorized');
  }

  // Check if already marked
  const existing = await Attendance.findOne({
    where: { registrationId: registration.id }
  });

  if (existing) {
    throw new Error('Attendance already marked');
  }

  // Create attendance entry
  const attendance = await Attendance.create({
    registrationId: registration.id,
    checkinMethod,
    status: 'present'
  });

  return attendance;
}





static async getAttendanceByEvent(eventId) {
  // 1. Fetch all attendances for the event via Registration
  const attendances = await Attendance.findAll({
    include: [{
      model: Registration,
      where: { eventId },
      attributes: ['id', 'userId', 'eventId', 'status', 'positionInWaitlist', 'registeredAt']
    }]
  });

  // console.log(getAttendanceByEvent);
  if (!attendances.length) return [];

  // 2. Extract registration IDs
  const registrationIds = attendances.map(a => a.registrationId);

  // 3. Fetch registrations with events
  const registrationsWithEvents = await RegistrationService.getEventsByRegistrationIds(registrationIds);

  // 4. Combine into full object
  const combined = attendances.map(att => {
    const registration = att.Registration.toJSON();
    const regWithEvent = registrationsWithEvents.find(r => r.id === att.registrationId);

    return {
      attendance: att.toJSON(),
      registration,
      event: regWithEvent?.event || null
    };
  });

  return combined;
}


    static async getUserAttendance(userId) {
      const attendances = await Attendance.findAll({
        include: [{
          model: Registration,
          where: { userId },
          attributes: ['eventId']
        }]
      });
      return attendances;
    }

static async getUserAttendance(userId) {
  // 1. Fetch all attendances for the user via Registration
  const attendances = await Attendance.findAll({
    include: [{
      model: Registration,
      where: { userId },
      attributes: ['id', 'userId', 'eventId', 'status', 'positionInWaitlist', 'registeredAt']
    }]
  });

  if (!attendances.length) return [];

  // 2. Extract registration IDs
  const registrationIds = attendances.map(a => a.registrationId);

  // 3. Fetch registrations with events
  // Assuming this returns [{ id: registrationId, event: {...} }]
  const registrationsWithEvents = await RegistrationService.getEventsByRegistrationIds(registrationIds);

  // 4. Combine into full object
  const combined = attendances.map(att => {
    const registration = att.Registration.toJSON();
    const regWithEvent = registrationsWithEvents.find(r => r.id === att.registrationId);

    return {
      attendance: att.toJSON(),
      registration,
      event: regWithEvent?.event || null
    };
  });

  return combined;
}


  static async updateAttendance(attendanceId, updates) {
    const attendance = await Attendance.findByPk(attendanceId);
    if (!attendance) {
      throw new Error('Attendance not found');
    }

    await attendance.update(updates);
    return attendance;
  }

  
}

module.exports = AttendanceService;