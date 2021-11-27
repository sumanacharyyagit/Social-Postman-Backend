const express = require("express");
const app = express();

app.use(express.json());
const port = process.env.PORT || 3030; // export PORT=8080

// const www = process.env.WWW || './';
// app.use(express.static(www));
// console.log(`serving ${www}`);

// app.get('*', (req, res) => {
//     res.sendFile(`index.html`, { root: www });
// });

const users = [
  { "id": 0001, "fName": "Arnab", "lName": "Biswas", "email": "abc@xy.z", "password": "password" },
  { "id": 0002, "fName": "Arijit", "lName": "Roy", "email": "abc@xy.z", "password": "password" },
  { "id": 0003, "fName": "Anupam", "lName": "Roy", "email": "abc@xy.z", "password": "password" },
  { "id": 0004, "fName": "Suman", "lName": "Acharyya", "email": "abc@xy.z", "password": "password" },
];

const dateTime = new Date();

const postforms = [
    { "id": 1, "titleAddress": "India", "scheduleDateTime": dateTime, "text": "lorem ipsumrawshwarrwgwsgrwggesgesgesegeegeesgersgawrsgwrsgwrsgesgrwsgerwsrwgwrg", "targetMedia": "Facebook"
}];

app.get("/", (req, resp) => {
  resp.send("ROOT");
});

app.route("/login")
    .get((req, resp) => {
        resp.send("login page");
    })
    .post((req, resp) => {
        const user = {
            "email": req.body.email,
            "password": req.body.password,
        };
        resp.send(user);
    });

app.route("/register")
    .get((req, resp) => {
        resp.send(users);
    })
    .post((req, resp) => {
        const user = {
            "id": users.length + 1,
            "fName": req.body.fName,
            "lName": req.body.lName,
            "email": req.body.email,
            "password": req.body.password,
        };
        users.push(user);
        resp.send(user);
    });
    
// app.get("/register/users/:id", (req, resp) => {
// //   resp.send(req.params.uId);
//   let userId = users.find((usr) => {
//     return usr.id === parseInt(req.params.id);
//   });
//   if (!userId) resp.status(404).send("Not Found @404");
//   resp.send(userId);
// });


app.get("/dashboard", (req, resp) => {
  resp.send(["user1", "user2", "user3"]);
});


// app.get("/postform", (req, resp) => {
//   resp.send("postform");
// });

app.route("/postform")
    .get((req, resp) => {
        resp.send(postforms);
    })
    .post((req, resp) => {
        const postform = {
            "id": postforms.length + 1,
            "titleAddress": req.body.titleAddress,
            "scheduleDateTime": req.body.scheduleDateTime,
            "text": req.body.text,
            "targetMedia": req.body.targetMedia,
        };
        postforms.push(postform);
        resp.send(postform);
    });


// app.get("/datetime", (req, resp) => {
//   resp.send("datetime");
// });

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
