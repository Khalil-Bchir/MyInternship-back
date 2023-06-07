const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
    companyId: {type: String, ref: 'User',required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration:{ type: String,required: true },
    studentId: { type: String, ref: 'User', required: false },
    supervisorId: { type: String, ref: 'User', required: false },
},
{
    timestamps:true
});

const Internship = mongoose.model('Internship', internshipSchema);
module.exports = Internship;