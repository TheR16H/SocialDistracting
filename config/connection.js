const mongoose = require('mongoose'); // Import mongoose

mongoose.connect('mongodb://localhost:27017/SocialDistracting', {
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database');
});

module.exports = db;