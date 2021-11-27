const express = require("express");
const app = express();
const dotenv = require("dotenv").config();


const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose');

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

// Importing the routes
// const userRoutes = require("./routes/userRoute");
const authRoutes = require("./routes/auth");
// const schedulePostRoutes = require("./routes/schedulePostRoute");

const port = process.env.PORT || 3000; // export PORT=8080

app.use(cors());
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

// app.use("/api/user", userRoutes);
app.use("/auth", authRoutes);
// app.use("/api/schedulePost", schedulePostRoutes);


// const users = [
//   { "id": 0001, "fName": "Arnab", "lName": "Biswas", "email": "abc@xy.z", "password": "password" },
//   { "id": 0002, "fName": "Arijit", "lName": "Roy", "email": "abc@xy.z", "password": "password" },
//   { "id": 0003, "fName": "Anupam", "lName": "Roy", "email": "abc@xy.z", "password": "password" },
//   { "id": 0004, "fName": "Suman", "lName": "Acharyya", "email": "abc@xy.z", "password": "password" },
// ];

// const postforms = [
//     { "id": 1, "titleAddress": "India", "scheduleDateTime": dateTime, "text": "lorem ipsumrawshwarrwgwsgrwggesgesgesegeegeesgersgawrsgwrsgwrsgesgrwsgerwsrwgwrg", "targetMedia": "Facebook"
// }];

// app.route("/login")
//     .get((req, resp) => {
//         resp.send("login page");
//     })
//     .post((req, resp) => {
//         const user = {
//             "email": req.body.email,
//             "password": req.body.password,
//         };
//         resp.send(user);
//     });

// app.route("/register")
//     .get((req, resp) => {
//         resp.send(users);
//     })
//     .post((req, resp) => {
//         const user = {
//             "id": users.length + 1,
//             "fName": req.body.fName,
//             "lName": req.body.lName,
//             "email": req.body.email,
//             "password": req.body.password,
//         };
//         users.push(user);
//         resp.send(user);
//     });
    
// // app.get("/register/users/:id", (req, resp) => {
// // //   resp.send(req.params.uId);
// //   let userId = users.find((usr) => {
// //     return usr.id === parseInt(req.params.id);
// //   });
// //   if (!userId) resp.status(404).send("Not Found @404");
// //   resp.send(userId);
// // });


// // app.get("/postform", (req, resp) => {
// //   resp.send("postform");
// // });

// app.route("/postform")
//     .get((req, resp) => {
//         resp.send(postforms);
//     })
//     .post((req, resp) => {
//         const postform = {
//             "id": postforms.length + 1,
//             "titleAddress": req.body.titleAddress,
//             "scheduleDateTime": req.body.scheduleDateTime,
//             "text": req.body.text,
//             "targetMedia": req.body.targetMedia,
//         };
//         postforms.push(postform);
//         resp.send(postform);
//     });


app.listen(port, () => console.log(`listening on http://localhost:${port}`));
