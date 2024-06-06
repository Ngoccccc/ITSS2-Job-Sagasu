const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  experience: [
    {
      company: {
        type: String,
      },
      role: {
        type: String,
      },
      start: {
        type: Date,
      },
      end: {
        type: Date
      },
      achievements: {
        type: String
      }
    }
  ],
  skills: {
    type: [String],
    required: true
  },
  education: [
    {
      institution: {
        type: String,
      },
      degree: {
        type: String,
      },
      start: {
        type: Date,
      },
      end: {
        type: Date
      },
      achievement: {
        type: String
      }
    }
  ]
});

// Exports Schema post 
const Post = mongoose.model('Candidate', postSchema);

module.exports = Post;