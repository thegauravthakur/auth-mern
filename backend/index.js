const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptionsDelegate = require("./utils/cors");
const dbConnect = require("./controller/dbConnect");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptionsDelegate));

dbConnect();

app.use(userRoute);
app.use(authRoute);

app.listen(PORT, () => console.log("Server started listening on port " + PORT));
