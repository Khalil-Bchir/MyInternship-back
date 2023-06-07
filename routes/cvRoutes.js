const express = require ('express');
const bodyParser = require('body-parser');
const cvController = require('../controllers/cvController')

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/submit-cv',cvController.submitCv);


module.exports = router;
