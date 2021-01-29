const UserModel = require("../../model/user");
const validateData = require("../../validator/auth/loginUser");
const { compareHash } = require("../../utils/bcrypt");
const signTokenAndSendCookie = require("../../helpers/signTokenAndSendCookie");
const jwt = require("jsonwebtoken");

module.exports = async (req, res) => {
  const { email, password } = req.body;
  const error = validateData(req.body);
  if (error) return res.status(401).send("wrong password/email");
  try {
    const user = await UserModel.findOne({ email }).exec();
    if (user && !user.password) {
      res.status(401).send("User havn't enabled the email-password login yet!");
    } else if (user && compareHash(password, user.password)) {
      await signTokenAndSendCookie(user, res);
    } else {
      res.status(401).send("wrong password/email");
    }
  } catch (e) {
    console.log({e})
    switch (e.code) {
      default:
        return res
          .status(500)
          .send("an error occurred from our side, please try again later");
    }
  }
};
