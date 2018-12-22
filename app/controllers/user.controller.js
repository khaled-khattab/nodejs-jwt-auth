const User = require('../services/user.service');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Joi = require('joi');

async function register(req, res, next){
  try {
    //validate request data
    const schema = {
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    };
    const validator = Joi.validate(req.body, schema);
    if(validator.error)
      return res.status(400).json({message: validator.error.details[0].message});

    //validate email uniqueness
    validateEmail = await User.validateEmail(req.body.email);
    if(validateEmail)
      return res.status(400).json({message: "This email aleady exists!"});

    //construct object and call the service method
    var user = {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10)
    };
    const result = await User.register(user);
    return res.status(201).json(result);
  } catch (e) {
    return res.status(500).json({message: "Error while registering: "+ e});
  }
}

async function login(req, res, next){
  try {
    //validate request data
    const schema = {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    };
    const validator = Joi.validate(req.body, schema);
    if(validator.error)
      return res.status(400).json({message: validator.error.details[0].message});

    //construct object and call the service method
    var user = {
      email: req.body.email,
      password: req.body.password
    };
    const result = await User.login(user);
    return res.status(result.status).json(result.data);
  } catch (e) {
    return res.status(500).json({message: "Error while logging in: "+ e});
  }
}

async function me(req, res, next){
  try {
    const result = await User.getUser(req.body);
    return res.status(result.status).json(result.data);
  } catch (e) {
    return res.status(500).json({message: "Error getting user: "+ e});
  }
}

module.exports = {register, login, me};