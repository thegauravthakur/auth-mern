module.exports = (user, check) => {
  const { password, __v, ...rest } = !check ? user.toObject() : check;
  rest.id = rest._id;
  delete rest._id;
  return rest;
};
