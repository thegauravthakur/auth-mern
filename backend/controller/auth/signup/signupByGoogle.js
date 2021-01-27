const {OAuth2Client} = require('google-auth-library');
const signTokenAndSendCookie = require('../../../helpers/signTokenAndSendCookie');
const UserModel = require('../../../model/user');

const client = new OAuth2Client(process.env.CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  console.log(ticket.getPayload());
  return ticket.getPayload();
}

module.exports = async (req, res) => {
  const {tokenObj} = req.body;
  try {
    const {email, name} = await verify(tokenObj.id_token);
    const user = await UserModel.findOne({email}).exec();
    if (user) await signTokenAndSendCookie(user, res);
    else {
      const newUser = new UserModel({name, email});
      await newUser.save();
      await signTokenAndSendCookie(newUser, res);
    }
  } catch (e) {
    res.status(400).send('error while creating account!');
  }
};
