const express = require('express');
const router = express.Router();
const UserController = require('../app/controllers/user.controller');
const jwt = require('jsonwebtoken')

router.post('/me', UserController.me);

module.exports = router;