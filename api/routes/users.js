const { json } = require('express');
const express = require('express');
const { route } = require('../../app');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = require('../controllers/user');
const User = require('../models/user');

router.post('/signup',UserController.signup)

router.post('/login', UserController.login)

router.delete('/:userId', UserController.remove_user)

module.exports = router;