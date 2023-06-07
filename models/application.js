const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    studentId:{type: String, ref: 'User', required: true},
    internshipId:{type: mongoose.Schema.Types.ObjectId, ref:'Internship', required: true},
},
{
    timestamps:true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;