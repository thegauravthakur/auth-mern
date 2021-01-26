const axios = require("axios");
const UserModel = require("../../model/user");
const signTokenAndSendCookie = require("../../helpers/signTokenAndSendCookie");

module.exports = async (req, res) => {
  const { accessToken } = req.body;
  try {
    const { data } = await axios.get(
      "https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=" +
        accessToken
    );
    if ("email" in data && data["email"].length > 0) {
      const user = await UserModel.findOne({ email: data["email"] }).exec();
      if (user) await signTokenAndSendCookie(user, res);
      else res.status(401).send("User doesn't exist ");
    } else {
      res.status(400).send("User doesn't have a email!");
    }
  } catch (e) {
    res.status(400).send("Error while logging in!");
  }
};
