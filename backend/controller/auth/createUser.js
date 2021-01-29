const validateData = require("../../validator/auth/createUser");
const UserModel = require("../../model/user");
const { textToHash } = require("../../utils/bcrypt");
const signTokenAndSendCookie = require("../../helpers/signTokenAndSendCookie");

module.exports = async (req, res) => {
  const error = validateData(req.body);
  if (error) {
    const { details } = error;
    return res.status(400).send(details[0].message);
  }
  try {
    const user = await UserModel.findOne({ email: req.body.email }).exec();
    if (user && user.password)
      return res.status(409).send("Account with same email already exists!");
    else if (user && !user.password) {
     await UserModel.findOneAndUpdate(
        { email: req.body.email },
        { $set: { password: textToHash(req.body.password) } },
        { lean: true, new: true }
      );
      const user = await UserModel.findOne({email:req.body.email}).exec();
      await signTokenAndSendCookie(user, res);
    } else {
      const newUser = new UserModel({
        ...req.body,
        password: textToHash(req.body.password),
      });
      await newUser.save();
      await signTokenAndSendCookie(newUser, res);
    }
  } catch (e) {
    console.log({ e });
    switch (e.code) {
      case 11000:
        return res.status(409).send("Account with same email already exists!");
      default:
        return res.status(500).send("error occurred while creating user");
    }
  }
};
