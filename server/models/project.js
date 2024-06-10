const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projects: [{
    type: String
  }],
  transcript: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Project', projectSchema);
