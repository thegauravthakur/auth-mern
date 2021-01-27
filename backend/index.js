const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const dbConnect = require("./controller/dbConnect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3001;

dbConnect();
app.get("/", (req, res) => {
  console.log("home route called");
  res.send("working");
});
const whitelist = ["https://mern-auth.vercel.app"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};
app.use(cors(corsOptionsDelegate));
app.use(userRoute);
app.use(authRoute);


app.listen(PORT, () => console.log("Server started listening on port " + PORT));
