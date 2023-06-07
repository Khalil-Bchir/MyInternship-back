const Internship = require('../models/internship');
const User = require('../models/users');

const internshipController = {};

//create an internship
internshipController.createInternship = async (req, res) => {
    try {
        // Find the user who is the company by userType and userId
        const id = req.params.userId;
        const companyUser = await User.findOne({ userId: id});
    
        // If the company user cannot be found, return an error
        if (!companyUser) {
          return res.status(400).json({ message: 'Company not found' });
        }
    
        // Create a new internship with the companyUser userId as the company reference
        const newInternship = new Internship({
          title: req.body.title,
          description: req.body.description,
          duration: req.body.duration,
          companyId : companyUser.userId,
        });

        if( User.userType ==='CO'){
          newInternship.companyId = User.userId;
        }
        
        // Save the internship to the database
        const savedInternship = await newInternship.save();

        res.status(201).json(savedInternship);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
  };

//get all internships

internshipController.getAllInternships = async (req, res) => {
  try {
    const internships = await Internship.find();
    res.status(200).json(internships);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//get internship by id

internshipController.getInternshipById = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    res.status(200).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//update an internship
internshipController.updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//delete an internship
internshipController.deleteInternship = async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Internship deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Add a student as trainee
internshipController.updateStudentId = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId, userType: 'ST' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { studentId: user.userId },
      { new: true }
    );

    res.status(200).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//add a supervisor
internshipController.updateSupervisorId = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.body.userId, userType: 'PR' });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { supervisorId: user.userId },
      { new: true }
    );

    res.status(200).json(internship);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = internshipController;