const mongoose = require("mongoose");
const validator = require("validator");

const { Schema } = mongoose;

const schema = new Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    default: 'patient'
  },
  phoneNumber:{
    type : String,
    required: [true, "Please enter your phone number"]
  },
  profileImage: {
    type: [{
      url: {
        type: String,
        required: true
      },
      cloudinaryId: {
        type: String,
        required: true
      },
      owner: {
        type: String,
        required: true
      },
    }],
    required: true,
    default: []
  },
});

module.exports = ModelUserHelper = mongoose.model("ModelUserHelper", schema);


