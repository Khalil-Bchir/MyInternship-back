const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
    studentId : {type: String, ref: 'User' , required: true},
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address:{type: String},
    education: [{
        degree: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        institution: { type: String, required: true },
        graduationDate: { type: String, required: true }
    }],
    experience: [{
        jobTitle: { type: String },
        companyName: { type: String },
        employmentDates: { type: String},
        responsibilities: [{ type: String }]
    }],
    skills: [{ type: String }],
    certifications: [{
        certification: { type: String},
        issuingOrganization: { type: String },
        date: { type: String }
    }],
    },
    {
        timestamps: true
    });

const CV = mongoose.model('CV', CVSchema);

module.exports = CV;
