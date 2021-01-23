const express = require('express');
const createUser = require('../controller/auth/createUser');
const loginUser = require('../controller/auth/loginUser');
const logoutUser = require('../controller/auth/logoutUser');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.get('/logoutUser', logoutUser)
module.exports = router;
