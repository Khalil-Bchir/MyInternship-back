const express = require("express");
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const Application = require ('../models/application');

const router = express.Router();

const uploadDirectory = path.join(__dirname, '../uploads');

// create uploads directory if it does not exist
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

//upload CV file
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, uploadDirectory)
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now()+ '--' +file.originalname )
  }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    const { studentId, internshipId } = req.body;
    const { filename } = req.file;

    // Check if there is already an application with the same studentId and internshipId
    const existingApplication = await Application.findOne({ studentId, internshipId });
    if (existingApplication) {
      return res.status(400).json({ message: 'An application with this student and internship ID already exists.' });
    }

    const application = new Application({
      cv: filename,
      studentId,
      internshipId
    });

    await application.save();
    res.send('File uploaded with success');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/uploads',upload.array('file'), (req,res)=>{
    console.log(req.file);
    res.send('Files uploaded with Success :) ')
  });

module.exports = router;