const express = require('express');
const cookieParser = require('cookie-parser');
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

app.listen(PORT, () => console.log('Server started listening on port ' + PORT))



