const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI + "dd sdfs df sdf", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.error("db connected");
  } catch (e) {
    console.error("error while connecting database");
  }
};
