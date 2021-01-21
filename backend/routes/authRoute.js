const express = require('express');
const createUser = require('../controller/auth/createUser');
const loginUser = require('../controller/auth/loginUser');
const router = express.Router();

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);

module.exports = router;
