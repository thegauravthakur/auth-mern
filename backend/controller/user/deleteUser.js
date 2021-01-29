const UserModel = require("../../model/user");

module.exports = async (req, res) => {
  const {id} = req.body;
  try {
    await UserModel.deleteOne({ _id: id });
    res.cookie("token", 'jasdkfl', {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
      sameSite:'none',
    });
    res.send('Account Deleted Successfully!');
  }catch (e) {
    res.status(400).send('error while deleting account');
  }
};
