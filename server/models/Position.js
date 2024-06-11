const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var positionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

//Export the model
module.exports = mongoose.model("Position", positionSchema);
