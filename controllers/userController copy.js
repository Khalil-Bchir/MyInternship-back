const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    const newUser = new User({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashedPassword,
      userId: customId,
      userType: req.body.userType
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
      const userId = req.params.userId;
      const { name, email, password } = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { userId: userId },
        { name, email, password },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).send('User not found');
      }
  
      return res.send('User updated successfuly\n'+ updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json( {message: error.message});
    }
};

// Delete user

UserController.deleteUser = async (req, res) => {
    try {
      const userId = req.params.userId;
      const deletedUser = await User.findOneAndDelete({ userId: userId });
  
      if (!deletedUser) {
        return res.status(404).send('User not found');
      }
  
      return res.status(201).send('User deleted');
    } catch (err) {
      console.error(err);
      return res.status(500).json( {message: error.message});
    }
};

module.exports = UserController;