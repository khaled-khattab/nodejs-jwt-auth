const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

async function login(data){
  try {
    const user = await User.findOne({email: data.email});
    if(user === null)
      return {status: 401, data: {message: "Unauthorized Access"}};
    const authenticated = await bcrypt.compare(data.password, user.password);
    if(!authenticated)
      return {status: 401, data: {message: "Unauthorized Access"}};
    const JWTToken = jwt.sign({
        email: user.email,
        _id: user._id
      }, 'secret', { expiresIn: '2h' } );
    return {status: 200, data: {token: JWTToken}};
  }
  catch (e) {
    throw new Error("Error while logging in: "+ e);
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

async function getUser(data){
  try {
    const user = await User.findOne({_id: data._id});
    if(user){
      user.password = undefined;
      return {status: 200, data: user};
    }
    return {status: 500, data: {message: "Error getting user: " + e}};
  } catch (e) {
    return {status: 500, data: {message: "Error getting user: " + e}};
  }
}

module.exports = {register, validateEmail, login, getUser};