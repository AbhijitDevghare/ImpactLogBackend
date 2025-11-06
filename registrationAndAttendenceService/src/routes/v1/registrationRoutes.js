const express = require('express');
const router = express.Router();
const RegistrationController = require('../../controllers/registrationController');
const jwtAuth = require('../../middleware/jwtAuth');


router.post('/:eventId',jwtAuth, RegistrationController.register);
router.get('/user/:userId',jwtAuth, RegistrationController.getUserRegistrations);
router.get('/event/:eventId', jwtAuth,RegistrationController.getEventRegistrations);

// router.get('/user/eventId',jwtAuth,RegistrationController.getIsUserRegisteredToEvent)

router.put('/:id/cancel', RegistrationController.cancel);
router.post('/checkin', RegistrationController.checkIn);
    


module.exports = router;
