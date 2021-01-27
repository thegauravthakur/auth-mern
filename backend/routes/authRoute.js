const express = require('express');
const logoutUser = require('../controller/auth/logoutUser');
const loginRoute = require('./loginRoute');
const signupRoute = require('./signupRoute');

const router = express.Router();

router.use('/loginUser', loginRoute);
router.use('/createUser', signupRoute);
router.get('/logoutUser', logoutUser)
module.exports = router;
