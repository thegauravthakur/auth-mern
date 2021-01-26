const jwt = require("jsonwebtoken");
const docToJsObject = require("./docToJsObject");

module.exports = async (user, res) => {
  const token = await jwt.sign({ id: user._id }, process.env.SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: true,
    maxAge: 3600000,
  });
  const rest = docToJsObject(user);
  res.send(rest);
};
