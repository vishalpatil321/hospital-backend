const express = require('express');
const authMiddleware = require('./authMiddleware');
const { adminRegister, loginAdmin, SendAppointmentController, getAppointments, getContacts ,postContacts} = require('./controller');
const router = express.Router();

router.post('/register-admin',adminRegister);
router.post('/login-admin',loginAdmin);
router.post('/send-appointments',SendAppointmentController);
router.post('/get-appointments',authMiddleware,getAppointments);
router.post('/get-contacts',authMiddleware,getContacts);
router.post('/post-contacts',postContacts);

module.exports = router;