const UserModel = require('../../model/user');
const validateData = require('../../validator/auth/loginUser');
const {compareHash} = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  const {email, password} = req.body;
  const error = validateData(req.body);
  if (error)
    return res.status(401).send('wrong password/email');
  try {
    const user = await UserModel.findOne({email}).exec();
    if (user && compareHash(password, user.password)) {
      const token = await jwt.sign({id: user._id}, process.env.SECRET);
      res.cookie('token', token, {httpOnly: true, sameSite: true, maxAge: 3600000})
      const { password, __v, ...rest } = user.toObject();
      rest.id = rest._id;
      delete rest._id;
      res.send(rest);
    } else {
      res.status(401).send('wrong password/email')
    }
  } catch (e) {
    switch (e.code) {
      default:
        return res.status(500).send('an error occurred from our side, please try again later');
    }
  }
}
