const jwt = require("jsonwebtoken");
const docToJsObject = require("./docToJsObject");

module.exports = async (user, res, check) => {
  const token = await jwt.sign({ id: user._id }, process.env.SECRET);
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite: "none",
  });
  const rest = !check ? docToJsObject(user) : user;
  res.send(rest);
};
