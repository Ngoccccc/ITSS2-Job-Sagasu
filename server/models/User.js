const mongoose = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    faceImage: {
      type: String,
    },
    idPhoto: {
      type: String,
    },
    companyPhoto: {
      type: String,
    },
    status: {
      type: String,
      enum: ["inactive", "active"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
