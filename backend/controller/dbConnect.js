const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);

module.exports = async () => {
  try {
    console.error(process.env.MONGO_URI)
    const db = await mongoose.connect(process.env.MONGO_URI+'dd sdfs df sdf', {useNewUrlParser:true, useUnifiedTopology:true});
    console.error('db connected')
  } catch (e) {
    console.error('error while connecting database')
  }
}
