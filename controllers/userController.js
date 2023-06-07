const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');

const UserController = {};

//generate userId
function generateCustomId(year, branch, index) {
  const indexStr = index.toString().padStart(3, '0');
  const customId = `${year}${branch}${indexStr}`;
  return customId;
};

// Create user
UserController.createUser = async (req, res) => {
  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Get the current year as a 2-digit string (e.g. "21" for 2021)
    const year = new Date().getFullYear().toString().slice(-2);

    // Get the number of existing users of the same userType
    const count = await User.countDocuments({ userType: req.body.userType });

    // Generate a custom ID for the new user
    const customId = generateCustomId(year, req.body.userType, count + 1);

    // Create a new user
    const { filename } = req.file;
    const newUser = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      userId: customId,
      userType: req.body.userType,
      image : filename
    });

    const savedUser = await newUser.save();

    // Generate a JWT
    const token = jwt.sign({ userId: savedUser._id }, 'my_secret_key');

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// Get all users
UserController.getAllUsers = async (req, res) =>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(error){
        console.log(error.message);
        res.status(500).json( {message: error.message});
    }
};

// Get user by userId
UserController.getUserById = async (req, res) =>{
    try{
        const userId = req.params.userId;
        const user = await User.findOne({ userId: userId });
        res.status(200).json(user);
    }catch(error){
        console.log(error.message);
        res.status(500).json( {message: error.message});
    }
};

// Update user
UserController.updateUser = async (req, res) => {
  try {
    // Find user by userId
    const userId = req.params.userId;
    const user = await User.findOne({ userId: userId });

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    user.name = req.body.name || user.name;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;

    // If password is provided, hash it and update it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // If image is provided, update it and move file to upload directory
    if (req.file) {
      const { filename } = req.file;

      // Remove old image file from upload directory
      const oldImage = user.image;
      if (oldImage) {
        const imagePath = path.join(__dirname, '../uploads', oldImage);
        await fs.promises.unlink(imagePath);
      }

      // Update user's image field with the new filename
      user.image = filename;

      // Move new file to upload directory
      const sourcePath = path.join(__dirname, '../uploads', filename);
      const destPath = path.join(__dirname, '../uploads', filename);
      await fs.promises.rename(sourcePath, destPath);
    }

    // Save updated user to database
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// Delete user

UserController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by userId
    const user = await User.findOneAndDelete({ userId: userId });

    // If user not found, return 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Remove user's image file from upload directory
    const oldImage = user.image;
    if (oldImage) {
      const imagePath = path.join(__dirname, '../uploads', oldImage);
      await fs.promises.unlink(imagePath);
    }
    
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = UserController;