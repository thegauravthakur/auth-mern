const express = require("express");
const verifyUser = require("../controller/user/verify");
const router = express.Router();

router.get("/verify", verifyUser);

module.exports = router;
