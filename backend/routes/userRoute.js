const express = require("express");
const jwtToUser = require("../controller/user/jwtToUser");
const deleteUser = require('../controller/user/deleteUser');
const router = express.Router();

router.get("/jwtToUser", jwtToUser);
router.post('/deleteAccount',  deleteUser);
module.exports = router;
