const User = require("../models/users");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const LogController = {};

// Login
LogController.login = async (req, res) => {
    try {
        // Check if email exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
          return res.status(400).json({ message: 'Invalid email' });
        }
    
        // Check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
          return res.status(400).json({ message: 'Invalid password' });
        }
    
        // Generate a JWT
        const token = jwt.sign({ userId: user._id }, 'my_secret_key');
    
        res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json( {message: error.message} );
      }
};

// Logout
LogController.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out' });
};

module.exports = LogController;

