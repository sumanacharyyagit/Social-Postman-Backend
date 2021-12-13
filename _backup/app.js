const express = require('express');
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./route/users");
const bodyParser = require("body-parser");


mongoose.connect("mongodb+srv://suman12345:<password>@suacluster.fqsrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
mongoose.connection.on('connected', connected => console.log("Database connection established. :-)"));
mongoose.connection.on('error', error => console.log("Database connection error. :-("));


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use('/users', userRoute);


app.use((req, resp, next) => {
    resp.status(404).json({
        "error": "URL not found with status 404...!",
    });
})
module.exports = app;