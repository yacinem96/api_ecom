const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      username:{
        type: String
      },
      firstName: {
        type: String,
        
      },
      lastName: {
        type: String,   
      },
      adress: {
        type: String,   
      },
      phone: {
        type: String
      },
      role: {
        type: String,
        default: "user",
      },
      token: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
