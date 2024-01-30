const express = require('express')
const router = express.Router();

/* This file defines routes for user management */

const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router;