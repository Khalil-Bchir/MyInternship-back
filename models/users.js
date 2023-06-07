const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        image:{
            type: String,
            required: false
        },  
        email:{
            type: String,
            required: [true,"Please enter a valid email address"],
            unique: true
        },
        password: {
            type: String,
            required: [true,"Please enter a password"]
        },
        name:{
            type: String,
            required: [true,"Please enter a name"]
        },
        lastname: {
            type: String,
            required: false
        },
        role: {
            type: String,
            enum: ['admin', 'user', 'moderator'],
            default: 'user'
        },
        userId: {
            type: String,
            required: true,
            unique: true
        },
        userType:{
            type: String,
            enum: ['ST', 'PR','CO','AD'],
            required:true
        }
    },
    
    {
        timestamps: true
    })

const User = mongoose.model('User', userSchema);
module.exports = User;