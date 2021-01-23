const jwt = require("jsonwebtoken");
const UserModel = require("../../model/user");

// It will check if token in invalid || not present
// then it will send a null in response otherwise it will send the user
// information except the password

module.exports = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) res.send(null);
    else {
      const { id } = data;
      const user = await UserModel.findById(id);
      const { password, __v, ...rest } = user.toObject();
      rest.id = rest._id;
      delete rest._id;
      res.send(rest);
    }
  });
};
