const express = require ('express');
const LogController = require ('../controllers/logController');

const router = express.Router();

router.post('/login', LogController.login);
router.post('/logout',LogController.logout);

module.exports = router;