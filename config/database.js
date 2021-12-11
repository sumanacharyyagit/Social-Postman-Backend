const mongoose = require('mongoose');

if(process.env.APP_ENV === "live"){
    mongoose.connect('mongodb://localhost/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB');
        }
    });
}
else if(process.env.APP_ENV === "dev"){
    mongoose.connect("mongodb+srv://suman12345:<password>@suacluster.fqsrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB');
        }
    });
}


module.exports = mongoose;