const mongoose = require('mongoose');
const User = require('../models/user.model');

async function register(user){
  const newUser = new User({
    _id: user._id,
    name: user.name,
    email: user.email,
    password: user.password,
  });
  try {
    const result = await newUser.save();
    return result;
  }
  catch (e) {
    throw new Error("Error while creating user: "+ e);
  }
}

async function validateEmail(userEmail){
  try {
    const result = await User.find({email: userEmail});
    if(result.length > 0)
      return true;
    return false;
  }
  catch (e) {
    throw new Error("Error validating email: "+ e);
  }
}

module.exports = {register, validateEmail};