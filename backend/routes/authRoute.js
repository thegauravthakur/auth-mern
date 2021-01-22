const express = require('express');
const createUser = require('../controller/auth/createUser');
const loginUser = require('../controller/auth/loginUser');
const protectedRoute = require('../middleware/protectedRoutes');

const router = express.Router();

router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.get('/test', (req,res) => res.send('done'))
module.exports = router;
