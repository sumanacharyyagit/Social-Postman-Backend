const mongoose = require('mongoose');
let url;
if(process.env.APP_ENV === "live"){
    url = 'mongodb://localhost/test';
} else if(process.env.APP_ENV === "dev"){
    url = "mongodb+srv://suman12345:<password>@suacluster.fqsrk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
}

 mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to MongoDB');
    }
});


module.exports = mongoose;