module.exports = (user) => {
  const {password, __v, ...rest} = user.toObject();
  rest.id = rest._id;
  delete rest._id;
  return rest;
}
