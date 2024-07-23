const mongoose = require('mongoose');

const foodSChema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  instructions: String, 
})

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    pantry: [foodSChema] 
  });
  
  const User = mongoose.model("User", userSchema);
  
  module.exports = User;