const express = require('express');
const createUser = require('../controller/auth/createUser');
const logoutUser = require('../controller/auth/logoutUser');
const loginRoute = require('./loginRoute');

const router = express.Router();

router.use('/loginUser', loginRoute);
router.post('/createUser', createUser);
router.get('/logoutUser', logoutUser)
module.exports = router;
