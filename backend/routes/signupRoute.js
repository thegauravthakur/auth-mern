const express = require("express");
const router = express.Router();
const signupByEmail = require("../controller/auth/createUser");
const signupByGoogle = require("../controller/auth/signup/signupByGoogle.js");
const signupByFacebook = require("../controller/auth/signup/signupByFacebook");

router.post("/email-password", signupByEmail);
router.post("/google", signupByGoogle);
router.post("/facebook", signupByFacebook);

module.exports = router;
