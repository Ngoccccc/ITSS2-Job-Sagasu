const mongoose = require("mongoose");
// Declare the Schema of the Mongo model
var postApplySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  summary: {
    type: String,
  },
  cv: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
  },
  salary: {
    type: String,
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
        type: String,
      },
      end: {
        type: String,
      },
      achievements: {
        type: String,
      },
    },
  ],
  skills: {
    type: [String],
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
        type: String,
      },
      end: {
        type: String,
      },
      achievement: {
        type: String,
      },
    },
  ],
});
//Export the model
module.exports = mongoose.model("postApply", postApplySchema);
