const express = require('express');
const mongoose = require('mongoose');
const dbConnect = require('./controller/dbConnect');
const authRoute = require('./routes/authRoute');
require('dotenv').config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3001;

dbConnect();
app.use(authRoute);

app.listen(PORT, () => console.log('Server started listening on port ' + PORT))
