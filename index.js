const express = require("express");
const app = express();
const dotenv = require("dotenv").config();


const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");


// Adding MongoDB connection
require("./config/database");

// Importing the routes
const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/auth");
const schedulePostRoutes = require("./routes/schedulePostRoute");

const port = process.env.PORT || 3000; // export PORT=8080

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/api", schedulePostRoutes);



app.listen(port, () => console.log(`listening on http://localhost:${port}`));
