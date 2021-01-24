const express = require("express");
const router = express.Router();
const loginUserByEmailPassword = require("../controller/auth/loginByEmailPassword");
const loginByGoogle = require("../controller/auth/loginByGoogle");
const loginByFacebook = require("../controller/auth/facebookLogin");
const loginByGithub = require('../controller/auth/loginByGithub');
const axios = require('axios');

router.post("/email-password", loginUserByEmailPassword);
router.post("/google", loginByGoogle);
router.post("/facebook", loginByFacebook);
router.get('/github', loginByGithub);
router.get('/github-initiate', async (req, res) => {
  res.redirect('https://github.com/login/oauth/authorize?client_id=036a1804f3cb8a9bd704');
})

module.exports = router;
