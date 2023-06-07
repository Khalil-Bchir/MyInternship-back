const express = require ("express");
const internshipController = require('../controllers/internshipController');

const router = express.Router();

router.post('/internships/:userId',internshipController.createInternship);
router.get('/internships', internshipController.getAllInternships);
router.get('/internships/:id',internshipController.getInternshipById);
router.put('/internships/:id',internshipController.updateInternship);
router.delete('/internships/:id',internshipController.deleteInternship);
router.put('/internships/:id/student',internshipController.updateStudentId);
router.put('/internships/:id/supervisor',internshipController.updateSupervisorId);

module.exports = router;