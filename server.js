const express = require("express");
const mongoose = require('mongoose');
const UserRoutes = require('./routes/userRoutes');
const registerRoutes = require ('./routes/registrationRoutes');
const logRoutes = require ('./routes/logRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const uploadFileRoutes = require ('./routes/uploadFileRoutes');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',UserRoutes);
app.use('/api',registerRoutes);
app.use('/api',logRoutes);
app.use('/api',internshipRoutes);
app.use('/api',uploadFileRoutes);

mongoose.connect('mongodb+srv://admin:5oz8NbmeyA7p0W9a@internship.bzcr0bu.mongodb.net/BackEnd?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
        console.log('Running on port 3000!');
    });
}).catch((err) => {
    console.log(err);
});