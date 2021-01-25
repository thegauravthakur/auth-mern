const bcrypt = require('bcrypt');

const textToHash = (text) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(text, salt);
}

const compareHash = (text, hash) => {
  return bcrypt.compareSync(text, hash);
}

module.exports = {textToHash, compareHash};
