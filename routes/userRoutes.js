const express = require ("express");
const UserController = require('../controllers/userController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

router.post('/users',upload.single('image'), UserController.createUser); // Create user Endpoint
router.get('/users',UserController.getAllUsers); // Get all users Endpoint
router.get('/users/:userId',UserController.getUserById); // Get user by userId Endpoint
router.put('/users/:userId',upload.single('image'),UserController.updateUser); // Update a user Endpoint
router.delete('/users/:userId',UserController.deleteUser); // Delete a user Endpoint

module.exports = router;
