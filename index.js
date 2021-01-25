const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dbConnect = require('./controller/dbConnect');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cookieParser());
const PORT = process.env.PORT || 3001;

dbConnect();
app.use(userRoute);
app.use(authRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}
app.listen(PORT, () => console.log('Server started listening on port ' + PORT))



