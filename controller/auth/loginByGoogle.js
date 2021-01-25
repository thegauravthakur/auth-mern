const { OAuth2Client } = require("google-auth-library");
const signTokenAndSendCookie = require("../../helpers/signTokenAndSendCookie");
const UserModel = require("../../model/user");

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  return ticket.getPayload();
}

module.exports = async (req, res) => {
  const { tokenObj } = req.body;
  try {
    const { email } = await verify(tokenObj.id_token);
    const user = await UserModel.findOne({ email }).exec();
    if (user) await signTokenAndSendCookie(user, res);
    else res.status(401).send("User doesn't exist ");
  } catch (e) {
    res.status(400).send("error while authenticating user");
  }
};
