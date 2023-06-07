const CV = require('../models/cv');
const fs = require('fs');

const cvController = {};

cvController.submitCv =(req,res)=>{

  try {
    // Create a new CV object with the submitted data
    const newCV = new CV({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      education: req.body.education,
      experience: req.body.experience,
      skills: req.body.skills
    });
  
    // Save the CV to MongoDB
    newCV.save()
      .then(() => console.log('CV saved to MongoDB'))
      .catch(err => console.log(err));
  
    // Convert the CV to JSON format
    const json = JSON.stringify(newCV, null, 2);
  
    // Write the JSON to a file
    fs.writeFile(`cvs/${newCV._id}.json`, json, 'utf8', (err) => {
      if (err) throw err;
      console.log(`CV exported to JSON file: ${newCV._id}.json`);
    });
  
    // Send a response to the client
    res.status(201).json({ json });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};