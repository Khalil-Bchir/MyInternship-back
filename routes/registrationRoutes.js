const express = require ("express");
const RegistrationController = require('../controllers/registrationController');

const router = express.Router();

router.post('/register', RegistrationController.register);  

module.exports = router;