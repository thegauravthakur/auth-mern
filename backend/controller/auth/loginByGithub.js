const axios = require("axios");

module.exports = async (req, res) => {
  const options = { headers: { accept: "application/json" } };
  const body = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    code: req.query.code,
  };
  const { data } = await axios.post(
    `https://github.com/login/oauth/access_token`,
    body,
    options
  );
  const token = data["access_token"];
  await getUserData(token);
  res.send('<script>window.parent.opener.test("hello");</script>');
};

const getUserData = async (token) => {
  let { data } = await axios.get("https://api.github.com/user", {
    headers: { Authorization: `token ${token}` },
  });
  console.log(data);
};
