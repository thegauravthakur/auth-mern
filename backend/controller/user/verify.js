const jwt = require("jsonwebtoken");
const UserModel = require("../../model/user");

module.exports = (req, res) => {
  const {token} = req.cookies;
  jwt.verify(token, process.env.SECRET, async (err, data) => {
    if (err) res.status(401).send("unauthorized access!");
    else {
      const {id} = data;
      const user = await UserModel.findById(id);
      const { password, __v, ...rest } = user.toObject();
      rest.id = rest._id;
      delete rest._id;
      res.send(rest);
    }
  });
};
