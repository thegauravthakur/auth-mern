const express = require("express");
const jwtToUser = require("../controller/user/jwtToUser");
const router = express.Router();

router.get("/jwtToUser", jwtToUser);
module.exports = router;
