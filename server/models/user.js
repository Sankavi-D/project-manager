const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    projects: [{
        type: String
    }],
    transcript: {
        type: String,
        default: '',  // Default to an empty string if no transcript is provided
    }
});

module.exports = mongoose.model('User', userSchema);