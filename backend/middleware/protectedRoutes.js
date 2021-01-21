const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const {token} = req.cookies;
 jwt.verify(token, process.env.SECRET, (err, token) => {
   if (err)
     res.status(401).send('unauthorized access!')
   else
     next();
 })
}
