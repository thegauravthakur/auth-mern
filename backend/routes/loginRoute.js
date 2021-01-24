const express = require("express");
const router = express.Router();
const loginUserByEmailPassword = require("../controller/auth/loginByEmailPassword");
const loginByGoogle = require("../controller/auth/loginByGoogle");

router.post("/email-password", loginUserByEmailPassword);
router.post("/google", loginByGoogle);

module.exports = router;
