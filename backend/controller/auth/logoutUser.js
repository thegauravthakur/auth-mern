module.exports = (req, res) => {
  res.cookie("token", 'jasdkfl', {
    httpOnly: true,
    secure: true,
    maxAge: 3600000,
    sameSite:'none',
  });
  res.send('user logged out');
}
